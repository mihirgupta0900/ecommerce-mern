import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path, isWhite) => {
    if (history.location.pathname === path && isWhite === true) {
        return { color: "#d7e2ed" };
    } else if (history.location.pathname === path) {
        return { color: "#3f72af" };
    } else if (isWhite === true) {
        return { color: "#f9f7f7" };
    } else {
        return { color: "#112d4e" };
    }
};

const Menu = ({ history }) => {
    const Signin = () => {
        return (
            <button className="inline-flex items-center bg-main-3 text-main-1 border-0 py-1 px-3 focus:outline-none hover:bg-main-3 rounded text-base md:mt-0">
                <Link to="/signin" style={currentTab(history, "/signin", true)}>
                    Signin
                </Link>
            </button>
        );
    };

    const Signup = () => {
        return (
            <button className="inline-flex items-center bg-main-3 text-main-1 border-0 py-1 px-3 focus:outline-none ml-2 hover:bg-main-3 rounded text-base md:mt-0">
                <Link to="/signup" style={currentTab(history, "/signup", true)}>
                    Signup
                </Link>
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
            </button>
        );
    };

    const Signout = () => {
        return (
            <button className="flex items-center justify-center bg-main-3 text-main-1 border-0 py-1 px-3 focus:outline-none ml-2 hover:bg-main-3 mt-2 rounded text-base md:mt-0">
                <span
                    onClick={() => {
                        signout(() => {
                            history.push("/");
                        });
                    }}
                >
                    Signout
                </span>
            </button>
        );
    };

    const UserDashboard = () => {
        return (
            <li className="mr-5 list-none cursor-pointer">
                <Link
                    to="/user/dashboard"
                    style={currentTab(history, "/user/dashboard")}
                >
                    U. Dashboard
                </Link>
            </li>
        );
    };

    const AdminDashboard = () => {
        return (
            <li className="mr-5 list-none cursor-pointer">
                <Link
                    to="/admin/dashboard"
                    style={currentTab(history, "/admin/dashboard")}
                >
                    A. Dashboard
                </Link>
            </li>
        );
    };

    const Cart = () => {
        return (
            <li className="mr-5 list-none cursor-pointer">
                <Link to="/cart" style={currentTab(history, "/cart")}>
                    Cart
                </Link>
            </li>
        );
    };

    const Tshirts = () => {
        return (
            <li className="mr-5 list-none cursor-pointer">
                <Link to="/tshirts" style={currentTab(history, "/tshirts")}>
                    Tshirts
                </Link>
            </li>
        );
    };

    const Home = (params) => {
        return (
            <li className="mr-5 list-none cursor-pointer">
                <Link style={currentTab(history, "/")} to="">
                    Home
                </Link>
            </li>
        );
    };

    return (
        <div className="bg-main-2 h-15">
            <div className="container h-full text-main-4 mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center justify-center">
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
                    <Home />
                    <Tshirts />
                    <Cart />
                    {/* {isAuthenticated() &&
                    isAuthenticated().user.role === 0 &&
                    {
                        <UserDashboard /> 
                    }} */}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                            {/* <UserDashboard /> */}
                            <AdminDashboard />
                        </Fragment>
                    )}
                </nav>
                <div className="flex justify-center align-center">
                    {!isAuthenticated() && (
                        <Fragment>
                            <Signin />
                            <Signup />
                        </Fragment>
                    )}
                    {isAuthenticated() && <Signout />}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Menu);
