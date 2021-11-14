require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const app = express();

// const { body, validationResult } = require('express-validator');

const User = require("./model/user");
const auth = require("./middleware/auth")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/register", async (req, res, next) => {
//    try {
//    const users = User.find({});
//    res.json(users)
//  } catch (error) {
//    next(error);
//  }
// })

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
      res.status(409).json({message: "User Already Exist. Please Login"});
    }

    encryptedPassword = await encryptPassword(password);

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

    res.status(201).json({
      message: "User successfully added!",
      user,
      success: true,
      error:false
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/register/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, age, email, password } = req.body;
    // const validationResult = await userSchema.validateAsync({first_name, last_name, age, email, password})
    
     const user = User.findOne({
      _id: id
     });
    
    if (!user) {
      return next();
    };
    encryptedPassword = await encryptPassword(password);

    const updateUser = await User.update(
      { _id: id },
      { $set:{first_name, last_name, age, email, password:encryptedPassword} },
      { upsert: true },
      
    );
    res.json({
      success: true,
      message: "User successfully update!"
    })

  } catch (error) {
    next(error);
  }
})

app.delete("/register/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = User.findOne({
      _id: id
    });
    if (!user) {
      return next();
    }

    await User.remove({
      _id:id
    })

    res.json({
      success: true,
      message: "User successfully remove!"
    })
    
  } catch (error) {
    next(error);
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Wrong route!", error: true });

})

function encryptPassword(password) {
  return bcrypt.hash(password, saltRounds);
 
}
module.exports = {app, encryptPassword };
