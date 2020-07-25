var braintree = require("braintree");
const { response } = require("express");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "gz8pk9khyjjqtcws",
    publicKey: "fw7kjj428zq2mvsw",
    privateKey: "99f3b90f47c83bb182d89f70f31a3108",
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).send({ "THE ERROR": err });
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromClient = req.body.amount;
    gateway.transaction.sale(
        {
            amount: amountFromClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true,
            },
        },
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );
};
