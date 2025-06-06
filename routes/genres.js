const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: 'action' },
  { id: 2, name: 'comedy' },
  { id: 3, name: 'drama' },
  { id: 4, name: 'horror' },
];

const validateGenre = genre => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
};

//  Get all genres
router.get('/', (req, res) => {
  res.send(genres);
});

// Create a new genre

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// Update a genre

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// Delete a genre

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Get a single genre by ID

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found');
  res.send(genre);
});

module.exports = router;
