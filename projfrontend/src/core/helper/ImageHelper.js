import React, { useState, useEffect } from "react";
import { API } from "../../backend";
import noImage from "../../assets/112815953-stock-vector-no-image-available-icon-flat-vector.jpg";

const ImageHelper = ({ product }) => {
    const imgSource = product ? `/api/product/photo/${product._id}` : noImage;

    const [data, setData] = useState({
        fetchedImg: null,
        loading: true,
    });

    const { fetchedImg, loading } = data;
    var productId = product._id;

    const fetchImage = (product) => {
        return fetch(`/api/product/photo/${product._id}`, {
            method: "GET",
        })
            .then((res) => res.blob())
            .then((img) => {
                setData({
                    ...data,
                    fetchedImg: URL.createObjectURL(img),
                    loading: false,
                });
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchImage(product);
    }, []);

    return (
        <div className="rounded flex align-center justify-center p-2">
            <img
                src={loading === true ? noImage : fetchedImg}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="rounded"
            />
        </div>
    );
};

export default ImageHelper;
