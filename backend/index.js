const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path= require('path')

const cookieParser = require('cookie-parser');
const BlogRouter = require('./Router/BlogRouter');
const UserRouter = require('./Router/UserRouter');
dotenv.config()

dotenv.config()


const app =express(); // now we can use the express features using app keyword

app.use(cors()); // for preventing the cross-origin error
app.use(express.json()); // for parsing the data in json which is coming from frontend
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); // managing the cookie using token JWT

app.use('/blogs', BlogRouter); // All routes starting with '/blogs' will go to BlogRouter
app.use('/users', UserRouter); // Same as above for users
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yogsamruddhi')
  .then(() => {
    app.listen(5000, () => {
      console.log('Running on port '+ 5000);
      console.log('DB connected');
      
      
    });
  })
  .catch(e => {
    console.log('Database connection error:', e);
  });
