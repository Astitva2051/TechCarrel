const express = require("express");
const askPrices = require("../../models/ask-Price");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {

    // groups asked prices on basis of price, size, category.
    const askedPrices = await askPrices.aggregate([
      {
        $group: {
          _id: {
            asked_price: "$asked_price",
            size: "$size",
            category: "$category",
          },
        },
      },
    ]);

    res.status(200).contentType('application/json').json(askedPrices);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
