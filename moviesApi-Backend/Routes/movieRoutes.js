const express = require('express');
const router = express.Router();
const Movie = require('../Models/movie');

router.post('/add-movie', async (req, res) => {
  try {
    const { title, director, releaseYear,overview} = req.body;
    const movie = new Movie({ title, director, releaseYear ,overview });
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding the movie' });
  }
});

router.get('/get-all', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving movies' });
  }
});

router.get('/get-single', async (req, res) => {
  const { id } = req.query;
  try {
    const movie = await Movie.findById(id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving the movie' });
  }
});

router.get('/get-paginated', async (req, res) => {
  const { page, size } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(size) || 10;
  const skip = (pageNumber - 1) * pageSize;
  try {
    const movies = await Movie.find().skip(skip).limit(pageSize);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving paginated movies' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Movie.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the count of movies.' });
  }
});
module.exports = router;
