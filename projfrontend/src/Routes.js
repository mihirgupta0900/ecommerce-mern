import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import Tshirts from "./user/Tshirts";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/cart" component={Cart} />
                <Route path="/tshirts" component={Tshirts} />
                <AdminRoute
                    path="/admin/dashboard"
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/admin/create/category"
                    component={AddCategory}
                />
                <AdminRoute
                    path="/admin/category"
                    component={ManageCategories}
                />
                <AdminRoute
                    path="/admin/create/product"
                    component={AddProduct}
                />
                <AdminRoute path="/admin/products" component={ManageProducts} />
                <AdminRoute
                    path="/admin/product/update/:productId"
                    component={UpdateProduct}
                />
                <PrivateRoute
                    path="/user/dashboard"
                    component={UserDashboard}
                />
            </Switch>
        </Router>
    );
};

export default Routes;
