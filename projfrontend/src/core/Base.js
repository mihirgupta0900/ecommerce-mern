import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";

const Base = ({
    title = "My Title",
    description = "My description",
    classname = "bg-main-1 text-main-4 p-4",
    children,
}) => (
    <div>
        <Menu />
        <div className="container-fluid">
            {/* <div className="jumbotron bg-main-1 text-main-4 text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div> */}
            <div className={classname}>{children}</div>
        </div>
        <Footer />
    </div>
);

export default Base;
