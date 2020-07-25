import React, { useState, useEffect } from "react";
// import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import BtPayment from "./BtPayment";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div className="">
                <div className="flex justify-center">
                    <span className="text-3xl">All Products in Cart</span>
                </div>
                {products?.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        );
    };

    const loadCheckOut = () => {
        return (
            <div className="">
                <h2>This section is for checkout</h2>
            </div>
        );
    };

    return (
        <Base
            title="Cart Page"
            description="Ready to checkout"
            classname="bg-main-1 text-main-4 p-4"
        >
            <div style={{minHeight: '70vh'}} className="flex flex-col md:flex-row justify-between">
                <div className="flex-1 flex justify-center">
                    {products.length > 0 ? (
                        loadAllProducts(products)
                    ) : (
                        <h3>NO PRODUCTS IN CART</h3>
                    )}
                </div>
                <div className="flex-1">
                    {/* <StripeCheckout products={products} setReload={setReload} /> */}
                    <BtPayment products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    );
};

export default Cart;
