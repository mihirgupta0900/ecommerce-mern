import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

export const adminLeftSide = () => {
    return (
        <div className="card">
            <h4 className="card-header bg-main-3 text-center">
                <Link to="/admin/dashboard" className="text-white">
                    Admin Navigation
                </Link>
            </h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link
                        className="nav-link text-main-4"
                        to="/admin/create/category"
                    >
                        Create Categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-main-4" to="/admin/category">
                        Manage Categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link
                        className="nav-link text-main-4"
                        to="/admin/create/product"
                    >
                        Create Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-main-4" to="/admin/products">
                        Manage Products
                    </Link>
                </li>
                {/* <li className="list-group-item">
                    <Link
                        className="nav-link text-main-4"
                        to="/admin/categories"
                    >
                        Manage Orders
                    </Link>
                </li> */}
            </ul>
        </div>
    );
};

const AdminDashBoard = () => {
    const {
        user: { name, email, role },
    } = isAuthenticated();

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span>{" "}
                        {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span>{" "}
                        {email}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Base
            title="Welcome to admin area"
            description="Manage all of your products here"
            classname="container p-4"
        >
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow-1 mb-10 md:mr-10">{adminLeftSide()}</div>
                <div className="flex-grow-4 md:ml-10">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    );
};

export default AdminDashBoard;
