const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');

const app = express();

// Bodyparser middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Controllers
app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

// Connect to port
app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);