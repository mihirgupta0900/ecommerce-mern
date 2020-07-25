import React from "react";
import DropIn from "braintree-web-drop-in-react";
import { useState } from "react";
import { useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { getMeToken, processPayment } from "./helper/btPaymentHelper";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";

const BtPayment = ({ products, setReload = (f) => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    // console.log(userId, token)

    const getToken = (userId, token) => {
        getMeToken(userId, token)
            .then((data) => {
                // console.log(data);
                if (data?.error) {
                    setInfo({ ...info, error: data.error });
                } else {
                    const clientToken = data.clientToken;
                    setInfo({ ...info, clientToken });
                }
            })
            .catch((err) => console.log("ERR ====>", err));
    };

    const showPayment = () => {
        if (info.clientToken !== null && products.length > 0) {
            return (
                <div>
                    <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                    />
                    <button
                        onClick={onPurchase}
                        className="mt-4 bg-main-3 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                    >
                        Buy
                    </button>
                </div>
            );
        } else if (products.length > 0) {
            return <h3 className='text-2xl text-center' >Please log in</h3>;
        } else {
            return "";
        }
    };

    const showBrainTreeDropIn = () => {
        return (
            <div>
                {/* {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) =>
                                (info.instance = instance)
                            }
                        />
                        <button
                            onClick={onPurchase}
                            className="mt-4 bg-main-3 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                        >
                            Buy
                        </button>
                    </div>
                ) : (
                    ""
                )} */}
                {showPayment()}
            </div>
        );
    };

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then((data) => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotalPrice(),
                };
                processPayment(userId, token, paymentData)
                    .then((res) => {
                        console.log(res);
                        setInfo({
                            ...info,
                            loading: false,
                            success: true,
                        });
                        console.log("PAYMENT SUCCESS");
                        const orderData = {
                            products: products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                        };
                        createOrder(userId, token, orderData);
                        cartEmpty(() => {
                            console.log("Did we crash?");
                        });
                        setReload(!reload);
                    })
                    .catch((err) => {
                        setInfo({ ...info, loading: false, success: false });
                        console.log(err);
                        console.log("PAYMENT FAILED");
                    });
            })
            .catch((err) => console.log(err));
    };

    const getTotalPrice = () => {
        let amount = 0;
        // Loop through all products and update amount
        products.map((product) => {
            amount = amount + product.price;
        });
        return amount;
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    return (
        <div>
            {/* <h3>Your bill is {getTotalPrice()}</h3> */}
            <div className="flex justify-center mb-5">
                <span className="text-3xl">Total Bill: ${getTotalPrice()}</span>
            </div>
            <h3>{showBrainTreeDropIn()}</h3>
            {/* <h3>Hi</h3> */}
        </div>
    );
};

export default BtPayment;
