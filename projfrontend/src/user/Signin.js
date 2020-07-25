import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { isAuthenticated, signin, authenticate } from "../auth/helper/index";

const Signin = () => {
    const [values, setValues] = useState({
        email: "mihirgupta0900@gmail.com",
        password: "12345",
        error: "",
        loading: false,
        didRedirect: false,
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = (fieldName) => (e) => {
        setValues({ ...values, error: false, [fieldName]: e.target.value });
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then((data /* token and user object */) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true,
                        });
                    });
                }
            })
            .catch(console.log("Signin req failed"));
    };

    const signInForm = () => {
        return (
            <div className="flex align-center justify-center">
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-full-name"
                            >
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                onChange={handleChange("email")}
                                value={email}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-full-name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-username"
                            >
                                Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-username"
                                type="password"
                                placeholder="******************"
                                onChange={handleChange("password")}
                                value={password}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <Base title="Sign in page" description="A page for user to sign up!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    );
};

export default Signin;