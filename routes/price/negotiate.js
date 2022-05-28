// Stores all the ask price of a product.

const express = require("express");
const askPrices = require("../../models/ask-Price");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");

router.post("/", verifyToken, async (req, res, next) => {
  console.log(req.user);
  try {
    await askPrices.create({
      user: req.user,
      title: req.body.title,
      category: req.body.category,
      size: req.body.size,
      asked_price: req.body.asked_price,
    });

    res.status(201).send("Asked price saved");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
