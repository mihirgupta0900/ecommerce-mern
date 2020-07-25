import React, { useState, useEffect } from "react";
import StripeCheckoutButton from "react-stripe-checkout";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { API } from "../backend";

const StripeCheckout = ({
    products,
    setReload = (f) => f,
    reload = undefined,
}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: "",
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    // Get the total cart price
    const getTotalPrice = () => {
        let amount = 0;
        // Loop through all products and update amount
        products.map((product) => {
            amount = amount + product.price;
        });
        return amount;
    };

    const makePayment = (token) => {
        const body = {
            token,
            products,
        };
        const headers = { "Content-Type": "application/json" };
        return fetch(`/api/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
            .then((res) => {
                console.log(res);
                console.log("STATUS ==> ", res.status);
                cartEmpty();
            })
            .catch((err) => console.log(err));
    };

    // Strip Button UI
    const showStripeButton = () => {
        return isAuthenticated() ? (
            // STRIPE PAYMENT
            // <StripeCheckoutButton
            //     stripeKey={process.env.REACT_APP_STRIPE_PK}
            //     token={makePayment}
            //     amount={getTotalPrice() * 100} // * 100 as stripe takes amount in cents, we want in dollars
            //     name="Buy T-shirts"
            //     shippingAddress
            //     billingAddress
            // >
            //     <button className="btn btn-success">Pay with Stripe</button>
            // </StripeCheckoutButton>
            <button className="btn btn-success">Pay with Stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn-btn-warning">Signin</button>
            </Link>
        );
    };

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getTotalPrice()}</h3>
            {showStripeButton()}
        </div>
    );
};

export default StripeCheckout;
