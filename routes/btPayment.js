const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/btPayment");

const router = require("express").Router();
const { getUserById } = require("../controllers/user");

// PARAMETER EXTRACTOR
router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
    "/payment/braintree/:userId",
    isSignedIn,
    isAuthenticated,
    processPayment
);

module.exports = router;
