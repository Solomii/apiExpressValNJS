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

app.post("/register", async (req, res) => {

  try {
    const { first_name, last_name, age, email, password } = req.body;

   if (!(first_name && last_name && age && email && password  )) {
      res.status(400).json({ message:"All input is required"});
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
       res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      age: age,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    
    user.token = token;

    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;