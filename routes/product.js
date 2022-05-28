const express = require("express");
const products = require("../models/product");
const router = express.Router();

// Returns all the products.
router.get("/", async (req, res, next) => {
  try {
    const allproducts = await products.find({});

    res.status(200).contentType("application/json").json(allproducts);
  } catch (error) {
    next(error);
  }
});

// Insert a Product in DB.
router.post("/create", async (req, res, next) => {
  try {
    await products.create(req.body);

    res.status(201).send("Product inserted");
  } catch (error) {
    next(error);
  }
});

// Returns all the prodcuts grouped by category name.
router.get("/bycategory", async (req, res, next) => {
  try {
    const categorywiseProducts = await products.aggregate([
      {
        $group: {
          _id: "$category",
          "Product Title": { $addToSet: "$title" },
        },
      },
    ]);
    res.status(200).contentType("application/json").json(categorywiseProducts);
  } catch (error) {
    next(error);
  }
});

// Returns all the products which belong to particular category.
router.get("/:category", async (req, res, next) => {
  try {
    const categoryProducts = await products.find({
      category: req.params.category,
    });

    res.status(200).contentType("application/json").json(categoryProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
