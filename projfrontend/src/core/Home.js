import React, { useState, useEffect } from "react";
// import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Base
            title="Home Page"
            description="Welcome to the Home page"
            classname="bg-main-1 text-main-4 p-4"
        >
            <section className="text-gray-700 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            High Quality Tshirts
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Get high quality t-shirts for the best price.
                        </p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                <Link to='/tshirts'>Tshirts</Link>
                            </button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                            <Link to='/cart'>Cart</Link>
                            </button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img
                            className="object-cover object-center rounded"
                            alt="hero"
                            src="https://source.unsplash.com/WWesmHEgXDs/720x600"
                        />
                    </div>
                </div>
            </section>
        </Base>
    );
};

export default Home;
