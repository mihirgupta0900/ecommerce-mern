import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        createCategory(user._id, token, { name }).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
                setName("");
            }
        });
    };

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success">Category created successfully</h4>
            );
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to create category</h4>;
        }
    };

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-main-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Category
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Create a category here"
            description="Add a new category for new tshirts"
            classname="container p-4"
        >
            <div style={{minHeight: '60vh'}} className=" mt-20 row rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;
