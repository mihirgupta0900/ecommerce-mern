import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
    product,
    addToCart = true,
    removeFromCart = false,
    setReload = (f) => f,
    // function(f){return f}
    reload = undefined,
    propsClassName
}) => {
    const showAddToCart = () => {
        return (
            addToCart && (
                <button
                    onClick={addToCartFn}
                    className="mt-4 bg-main-3 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                >
                    Add to Cart
                </button>
            )
        );
    };

    const showRemoveFromCart = () => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload);
                    }}
                    className="mt-4 bg-main-3 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                >
                    Remove from cart
                </button>
            )
        );
    };

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCartFn = () => {
        addItemToCart(product, () => setRedirect(true));
    };

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const cardTitle = product ? product.name : "DEFAULT";
    const cardDescription = product ? product.description : "DEFAULT";
    const cardPrice = product ? product.price : "DEFAULT";

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-5">
            {getARedirect(redirect)}
            <ImageHelper product={product} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{cardTitle}</div>
                <div className="flex mt-3 flex-col md:flex-row justify-between">
                    <p className="text-gray-700 text-base">{cardDescription}</p>
                    <p className="text-gray-700 text-xl">$ {cardPrice}</p>
                </div>
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
    );
};

export default Card;
