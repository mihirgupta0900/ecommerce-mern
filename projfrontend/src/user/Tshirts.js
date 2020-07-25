import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getProducts } from "../core/helper/coreapicalls";
import Card from "../core/Card";

const Tshirts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts().then((data) => {
            if (data?.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProducts();
    }, []);
    return (
        <Base
            title="tshirts"
            description="tshirts"
            classname="bg-main-1 text-main-4"
        >
            <div className="flex flex-wrap align-center justify-center mb-20 mt-10 -m-4">
                {products?.map((product, index) => (
                    <div className="p-4" key={index}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Base>
    );
};
{
    /* <div className="col-4 mb-4" key={index}> */
}

export default Tshirts;
