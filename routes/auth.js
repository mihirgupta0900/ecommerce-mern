const router = require("express").Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.post(
    "/signin",
    /* Validation */
    [
        check("email").isEmail().withMessage("Should be a valid email"),
        check("password")
            .isLength({ min: 1 })
            .withMessage("Password field is required"),
    ],
    signin
);

router.post(
    "/signup",
    /* Validation */
    [
        check("name" /*, 'custom err message' (just another way to do it ) */)
            .isLength({ min: 3 })
            .withMessage(
                "Name should be atleast 3 characters" /* Custom error message */
            ),
        check("email").isEmail().withMessage("Should be a valid email"),
        check("password")
            .isLength({ min: 5 })
            .withMessage("Password should be atleast 5 characters long"),
    ],
    signup
);

router.get(
    "/signout" /* Remember this means "/api/signout/" as we meantioned '/api' while defining the middleware */,
    signout
);

// router.get('/testroute', isSignedIn, (req, res) => {
//     res.json(req.auth);
// })

module.exports = router;
