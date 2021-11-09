require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = require("./app");
// const server = http.createServer(app);
// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const helmet = require('helmet');
// const md5 = require("md5");
// const app = express();
// const Schema = mongoose.Schema;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(helmet());


// const url = "mongodb://localhost:27017/users"
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, default: null},
//   lastName: { type: String, default: null },
//   age: {type:Number, min:18, index:true},
//   email: { type: String, unique: true, required: true },
//   passwordHash: { type: String, required: true },
// })

// app.get('/', (req, res) => {
//    if (!req.body) return res.json(error("error!"));
//   res.status(404).send('No route.');
// })

// app.post("/register", function (req, res) {
//   const newUser = new userSchema({
//     email: req.body.userName,
//     passwordHash: md5(req.body.passwordHash),
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     age: req.body.age
//   })
  
//   newUser.save(function (err) {
//      if(err){
//       res.send("Registration failed..!");
//     }else{
//       res.render('secrets');
//     }
//   })
// })


app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server started on :${PORT}`);
});