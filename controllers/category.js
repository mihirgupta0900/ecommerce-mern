const Category = require("../models/category");

// MIDDLEWARE
exports.getCategoryByID = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB",
            });
        }
        req.category = category;
        next();
    });
};

// POST
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB",
            });
        }
        res.json({ category });
    });
};

// GET
exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB",
            });
        }
        res.json(categories);
    });
};

// PUT
exports.updateCategory = (req, res) => {
    // const category = req.category;
    // category.name = req.body.name;

    // category.save((err, updatedCategory) => {
    // if (err) {
    //     return res.status(400).json({
    //         error: "Failed to update category",
    //     });
    // }
    // res.json(updatedCategory);
    // });
    const catId = req.params.categoryId;
    // console.log(catId)
    const newCatName = req.body.name;
    // console.log(newCatName)
    Category.findByIdAndUpdate(
        catId,
        { name: newCatName },
        (err, newUpdatedCat) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to update category",
                });
            }
            res.json(newUpdatedCat);
        }
    );
};

// DELETE
exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: `Failed to remove ${category.name}`,
            });
        }
        res.json({
            message: `Successfully removed the category \"${category.name}\"`,
            category: category,
        });
    });
};
