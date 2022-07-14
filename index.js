const crud = require('./routes/crud_demo');
const express = require('express');
const app = express();
app.use('/api/courses', crud);