require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const app = express();

const User = require("./model/user");
const auth = require("./middleware/auth")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

// Register
app.post("/register", async (req, res) => {

  try {
    const { first_name, last_name,age, email, password } = req.body;

    // Validate user input
   if (!(email && password && first_name && last_name )) {
      res.status(400).json({ message:"All input is required"});
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
       res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      age: age,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;