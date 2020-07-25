const router = require("express").Router();

const {
    getUserById,
    getUser /*, getAllUsers*/,
    updateUser,
    userPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

// TODO: google "router param"
router.param("userId", getUserById);

// GET USER
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// ASSIGNMENT (DONE)
/* router.get('/users', getAllUsers) */

// UPDATING USER INFO
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// GETTING PURCHASE LIST OF A USER
router.get(
    "/orders/user/:userId",
    isSignedIn,
    isAuthenticated,
    userPurchaseList
);

module.exports = router;
