import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getARedirect: false,
        formData: "",
    });

    const {
        name,
        description,
        price,
        stock,
        categories,
        category,
        loading,
        console,
        error,
        createdProduct,
        getARedirect,
        formData,
    } = values;

    const preload = () => {
        getCategories().then((data) => {
            // console.log(data);
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createProduct(user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        photo: "",
                        loading: false,
                        createdProduct: data.name,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const successMessage = () => {
        return (
            <div
                className="alert alert-success mt-3"
                style={{ display: createdProduct ? "" : "none" }}
            >
                <h4>{createdProduct} created successfully</h4>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="alert alert-danger mt-3"
                style={{ display: error ? "" : "none" }}
            >
                <h4>Error in creating the product</h4>
            </div>
        );
    };

    const handleChange = (name) => (e) => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const createProductForm = () => {
        return (
            <form>
                <span>Post photo</span>
                <div className="form-group">
                    <label className="btn btn-block btn-success">
                        <input
                            onChange={handleChange("photo")}
                            type="file"
                            name="photo"
                            accept="image"
                            placeholder="choose a file"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("name")}
                        name="photo"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        onChange={handleChange("description")}
                        name="photo"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("price")}
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                    />
                </div>
                <div className="form-group">
                    <select
                        onChange={handleChange("category")}
                        className="form-control"
                        placeholder="Category"
                    >
                        <option>Select</option>
                        {categories &&
                            categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        onChange={handleChange("stock")}
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        value={stock}
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-outline-success mb-3"
                >
                    Create Product
                </button>
            </form>
        );
    };

    return (
        <Base
            title="Add a product here!"
            description="Welcome to product creation section"
            classname="container p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            <div className="row text-main-4 rounded">
                <div className="col-md-8 offset-md-2">
                    {createProductForm()}
                    {successMessage()}
                    {errorMessage()}
                </div>
            </div>
        </Base>
    );
};

export default AddProduct;
