import { API } from "../../backend";

// * CATEGORY CALLS
// Create category
export const createCategory = (userId, token, category) => {
    return fetch(`/api/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

// Get all categories
export const getCategories = () => {
    return fetch(`/api/categories`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getCategory = (categoryId) => {
    return fetch(`/api/category/${categoryId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const removeCategory = (token, userId, categoryId) => {
    return fetch(`/api/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

export const updateCategory = (token, userId, categoryId, category) => {
    return fetch(`/api/category/${categoryId}/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

// * PRODUCT CALLS
// Create Product
export const createProduct = (userId, token, product) => {
    return fetch(`/api/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// Get all products
export const getAllProducts = () => {
    return fetch(`/api/products`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
// Delete Product
export const removeProduct = (productId, userId, token) => {
    return fetch(`/api/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// Get a product
export const getProduct = (productId) => {
    return fetch(`/api/product/${productId}`)
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};

// Update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`/api/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => console.log(err));
};
