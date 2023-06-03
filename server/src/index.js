require('./models/User');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo.');
});
mongoose.connection.on('error', () => {
  console.log('Error connecting to Mongo.');
});

app.get('/', requireAuth, (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
