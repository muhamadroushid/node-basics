const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');
const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
