// Handles registration of user.

require("dotenv").config();
var express = require("express");
var router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    // Get user input
    const {firstName, lastName, username, password } = req.body;

    // check if any input is missing.
    if (!( firstName && lastName && username && password)) {
      res.status(400).send("All input is required");
    } else {
      const oldUser = await User.findOne({ username });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      } else {
        // Create user in our database
        const user = await User.create({
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password,
        });

        // Create token
        const token = jwt.sign(
          { user_id: username },
          process.env.ACCESS_TOKEN_SECRET
        );

        // sets cookie
        res.status(201).cookie("access_token", token, {
          httpOnly: true,
        }).send("Account Created");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
