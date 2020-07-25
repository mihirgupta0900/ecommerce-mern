const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    // QUERING THE DATABASE
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "No user was found in the DB",
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

// ASSIGNMENT (DONE)
/*
exports.getAllUsers = (req, res) => {
    User.find().exec((error, users) => {
        if(error || !users){
            return res.status(400).json({
                error: "No user was found in the DB"
            })
        }
        return res.json({
            users: users
        })
    })
}
*/

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        // _id comes from req. profile which is being set by the middleware when we go to /user/:userId, regardless of the type of request
        { _id: req.profile._id },
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "DB Updating was not successful"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;        
            return res.json(user)
        }
    );
};

exports.userPurchaseList = (req, res) => {
    Order
        .find({ user: req.profile._id })
        .populate('user', '_id name')
        .exec((err, order) => {
            if(err){
                return res.status(400).json({
                    error: "No order in this account"
                })
            }
            return res.json(order)
        })
}

// MIDDLEWARE
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(item => {
        purchases.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
        })
    })

    // STORE IN DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases}},
        {new: true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save in DB"
                })
            }
            next()
        }
    )
}
