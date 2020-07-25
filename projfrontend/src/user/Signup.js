import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const { name, email, password, error, success } = values;

    const handleChange = (fieldName) => (e) => {
        setValues({ ...values, error: false, [fieldName]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }) // { name, email, password } = user
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true,
                    });
                }
            })
            .catch(console.log("Error in signup"));
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success text-center"
                        style={{ display: success ? "" : "none" }}
                    >
                        New account was created successfully. Please{" "}
                        <Link to="/signin">Login here</Link>
                    </div>
                </div>
            </div>
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

    const signUpForm = () => {
        return (
            // <div className="row">
            //     <div className="col-md-6 offset-sm-3 text-left">
            //         <form onSubmit={handleSubmit}>
            //             <div className="form-group">
            //                 <label className="text-light">Name</label>
            //                 <input
            //                     className="form-control"
            //                     onChange={handleChange("name")}
            //                     type="text"
            //                     value={name}
            //                 />
            //             </div>
            //             <div className="form-group">
            //                 <label className="text-light">Email</label>
            //                 <input
            //                     className="form-control"
            //                     onChange={handleChange("email")}
            //                     type="email"
            //                     value={email}
            //                 />
            //             </div>
            //             <div className="form-group">
            //                 <label className="text-light">Password</label>
            //                 <input
            //                     className="form-control"
            //                     onChange={handleChange("password")}
            //                     type="password"
            //                     value={password}
            //                 />
            //             </div>
            //             <button className="btn btn-success btn-block">
            //                 Submit
            //             </button>
            //         </form>
            //     </div>
            // </div>
            <div className="flex align-center justify-center">
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                htmlFor="inline-full-name"
                            >
                                Name
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                onChange={handleChange("name")}
                                value={name}
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
                            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <Base title="Sign up page" description="A page for user to sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    );
};

export default Signup;
