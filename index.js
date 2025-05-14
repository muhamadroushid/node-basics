const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'action' },
  { id: 2, name: 'comedy' },
  { id: 3, name: 'drama' },
  { id: 4, name: 'horror' },
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.findOne(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

const validateGenre = genre => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
};

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
