require('dotenv').config();
const express = require('express');
// const Joi = require('joi');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')

const app = express();
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then((result)=>app.listen(5000, console.log('Listening on port 5000...')))
  .catch((err)=> console.log(err));
    

app.use(authRoutes);