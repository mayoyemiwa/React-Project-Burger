require('dotenv').config();
const express = require('express');
// const Joi = require('joi');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'build')));

// -app.get('/', function (req, res) {
// +app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  })
// })

mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then((result)=>app.listen(process.env.DATABASE_URL, console.log('Listening on port 5000...')))
  .catch((err)=> console.log(err));
    

app.use(authRoutes);