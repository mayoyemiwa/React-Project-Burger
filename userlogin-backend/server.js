require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser');
const cors = require('cors')
// const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'build')));


// app.get('*/', function (req, res) {
//     res.sendFile(join(__dirname, 'build', 'index.html'));
//   })

mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then((result)=>app.listen(process.env.PORT || 5000, () =>{console.log('Listening on port 5000...')}))
  .catch((err)=> console.log(err));
    

app.use(authRoutes);