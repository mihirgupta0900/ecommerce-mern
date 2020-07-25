// API means http://localhost:7000/api
import { API } from "../../backend";

export const signup = (user) => {
    return fetch(`/api/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res /* {name, email, _id} = user */ ) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const signin = (user) => {
    return fetch(`/api/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();

        return fetch(`/api/signout`, {
            method: "GET",
        })
            .then((res) => console.log("Signout successful"))
            .catch((err) => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};
