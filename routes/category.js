const router = require("express").Router();
const {
    getCategoryByID,
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    removeCategory,
} = require("../controllers/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// PARAMETER EXTRACTOR
router.param("userId", getUserById);
router.param("categoryId", getCategoryByID);

// ACTUAL ROUTERS
// create routes
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);

// get routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory
);

// delete
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeCategory
);

module.exports = router;
