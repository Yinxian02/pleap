require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const requireAuth = require("./middleware/requireAuth")
const connectDB = require('./config/dbConn');

const port = process.env.PORT || 5001;

connectDB();

var bodyparser = require("body-parser");

app.use(logger);
app.use(cors(corsOptions));

app.use(bodyparser.json({limit: '500kb'}));
// Cross Origin Resource Sharing
// app.use(credentials);
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/signup', require('./routes/signup'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(requireAuth);
app.use('/users', require('./routes/api/users'));
app.use('/lessons', require('./routes/api/lessons'));
app.use('/learning-objects', require('./routes/api/learning-objects'));
app.use('/generativeAI', require('./routes/api/generativeAI'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler)

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.listen(port || 3000, () => {
    console.log(`Server is running on port: ${port}`);
});