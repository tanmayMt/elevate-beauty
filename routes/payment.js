const express = require("express");
const router = express.Router();
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router.get("/checkout", (req, res) => {
    console.log("get('/checkout')");
    gateway.clientToken.generate({}, (err, response) => {
        if (err) throw err;
        res.render("checkout", { clientToken: response.clientToken });
    });
});

router.post("/checkout", (req, res) => {
    const { paymentMethodNonce, amount } = req.body;

    gateway.transaction.sale(
        {
            amount,
            paymentMethodNonce,
            options: {
                submitForSettlement: true,
            },
        },
        (err, result) => {
            if (err || !result.success) {
                res.send("Transaction failed");
            } else {
                res.send("Transaction successful");
            }
        }
    );
});

module.exports = router;
