const crud = require('./routes/crud_demo');
const express = require('express');
const Joi = require('joi');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongo-exercises')
.then(()=> console.log('connected to mongoDB ... '))
.catch(err => {console.log('couldnt connect omongodb', err)});
app.use(express.json());
app.use('/', crud);
app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });