const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// exports.signup = (req, res) => {
//     console.log(
//         "REQ BODY",
//         req.body /* Function comes from the body parser middleware */
//         /* "req.body" Returns the body (json in this case as specified while using post req in postman) */
//     );
//     res.json({
//         message: "Signup route works!",
//     });
// };

exports.signup = (req, res) => {
    // ERRORS
    // Get the errors
    const errors = validationResult(req);
    // Check is there are errors and send the custom error msg we defined
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    // USER CREATION
    // Making a new user object from the data we get from the frontend
    const user = new User(req.body);

    // Saving the user to the database and returning the {name, email, _id} of the user if there are no errors
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB",
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    // ERRORS
    // Get the errors
    const errors = validationResult(req);
    // Check is there are errors and send the custom error msg we defined
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    // FIND
    // Finding the user in the database
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email does not exists",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match",
            });
        }

        // CREATE TOKEN
        const token = jwt.sign(
            /* PAYLOAD */ { _id: user._id },
            /* SECRET KEY */ process.env.SECRET
        );

        // PUT TOKEN IN COOKIE
        res.cookie("token", token, { expire: new Date() + 9999 });

        // SEND RESPONSE TO FRONTEND
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};

exports.signout = (req, res) => {
    // CLear cookies containing the token
    res.clearCookie("token");

    // Display message after clearing cookies
    res.json({
        message: "User signed out successfully",
    });
};

// PROTECTED ROUTES
// This is also a middleware, we do not need to add next() as this is a package and next() is already in the code
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});

// CUSTOM MIDDLEWARES
exports.isAuthenticated = (req, res, next) => {
    let checker =
        req.profile /* Profile set from the front end */ &&
        req.auth &&
        req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        res.status(403).json({
            error: "You are not ADMIN, Access Denied",
        });
    }
    next();
};
