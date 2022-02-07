require('dotenv').config();
const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')
// const forgetpwd = require('./public/ForgetPwd');

const app = express();
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));

// app.get(`/api/login/:email/:pwd`, async(req, res, next) => {
//     const {email, pwd} = req.params;
//     const findEmail = datas.find(data => data.email.toLowerCase() === email.toLowerCase())
//     if(!findEmail) res.status(404).json(`The account with ${email} as email does'not exist please try again or Signup below`)
//     else{
//         if(findEmail.pwd === pwd) res.status(200).json(findEmail)
//         else res.status(400).json("Wrong password try again")
//     }
// });

mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then((result)=>app.listen(5000, console.log('Listening on port 5000...')))
  .catch((err)=> console.log(err));
    
// const port = process.env.PORT 
app.use(authRoutes);