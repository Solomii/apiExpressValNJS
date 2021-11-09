require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("./model/user");
const auth = require("./middleware/auth")

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome");
});

// Register
app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
   if (!(email && password && first_name && last_name)) {
      res.status(400).json({ message:"All input is required"});
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
       res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
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
  // Our register logic ends here
});

// // Login
// app.post("/login", (req, res) => {
// // our login logic goes here
// });

module.exports = app;