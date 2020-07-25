import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
    getCategories,
    removeCategory,
    updateCategory,
} from "./helper/adminapicall";
import { adminLeftSide } from "../user/AdminDashBoard";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
    const [values, setValues] = useState({
        error: "",
        categories: [],
        updatedCategory: "",
    });
    const { categories, updatedCategory } = values;

    const { token, user } = isAuthenticated();

    const load = () => {
        getCategories().then((data) => {
            if (data?.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                });
                // console.log(data);
            }
        });
    };

    const handleDelete = (categoryId) => () => {
        removeCategory(token, user._id, categoryId)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    load();
                }
            })
            .catch();
    };

    const handleChange = (e) => {
        setValues({ ...values, updatedCategory: e.target.value });
    };

    const handleEdit = (categoryId) => () => {
        updateCategory(token, user._id, categoryId, updatedCategory)
            .then((data) => {
                if (data?.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    load();
                }
            })
            .catch();
    };

    useEffect(() => {
        load();
    }, []);

    const cateRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Categories</h4>
                <ul className="list-group">
                    {categories &&
                        categories.map((cate, index) => (
                            <div className="flex flex-col md:flex-row w-full">
                                <div className="flex justify-between align-center flex-grow">
                                    <div className="flex mt-auto mb-auto ml-5 align-center text-main-4 font-bold justify-center">
                                        {cate.name}
                                    </div>
                                    {/* TODO: Figure out how to use edit button */}
                                    <button className=" mt-3 mb-3 bg-main-3 mr-3 hover:bg-blue-700 text-white font-bold px-2 rounded" onClick={handleDelete(cate._id)} >
                                        x
                                    </button>
                                </div>
                                {/* <form
                                    onClick={handleEdit(cate._id)}
                                    className="flex align-center flex-grow"
                                >
                                    <div class="flex-grow-4">
                                        <input
                                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded ml-10 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            id="inline-full-name"
                                            type="text"
                                            value={updatedCategory}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <button className="mt-auto mb-auto bg-main-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Edit
                                        </button>
                                    </div>
                                </form> */}
                            </div>
                        ))}
                </ul>
            </div>
        );
    };

    return (
        <Base
            title="Manage Categories"
            description="Edit or Delete Categories"
            classname="container p-4"
        >
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow md:mr-10 mb-10 ">
                    {adminLeftSide()}
                </div>
                <div className="flex-grow-4 md:ml-10 ">{cateRightSide()}</div>
            </div>
        </Base>
    );
};

export default ManageCategories;
/* <li className="list-group-item" key={index}>
                                <div
                                    className="btn-toolbar flex justify-between"
                                    role="toolbar"
                                >
                                    <button
                                        type="button"
                                        className="mt-4 bg-main-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        {cate.name}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-4 bg-main-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleDelete(cate._id)}
                                    >
                                        x
                                    </button>
                                    <form>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                value={updatedCategory}
                                                onChange={handleChange}
                                                className='form-control'
                                            />
                                            <button
                                                type="button"
                                                className="mt-4 bg-main-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleEdit(cate._id)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </li> */
