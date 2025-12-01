import express from 'express';
const app = express();
const port = 3000;

import cors from 'cors';
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://admin:admin@cluster0.2gc0uml.mongodb.net/?appName=Cluster0');

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

const movieModel = mongoose.model('sdfgsdfgsdfg', movieSchema);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/movies', async (req, res) => {
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"

  const movies = await movieModel.find({});
  const Martin = req.header('X-Martin-Header');
  console.log('Received X-Martin-Header:', Martin);
  res.json({ myArray: movies });


})


app.post('/api/movies', async (req, res) => {

  const { title, year, poster } = req.body;

  const newMovie = new movieModel({ title, year, poster });
  await newMovie.save();
  console.log('Movie saved:', newMovie);
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

app.delete('/api/movies/:id', async(req, res) => {
  console.log('Deleting movie with id:', req.params.id);
  const movie = await movieModel.findByIdAndDelete(req.params.id)
  console.log('Movie deleted:', movie);
  res.json({message: 'Movie deleted successfully', movie: movie});
})

app.get('/api/movie/:id', async (req, res) => {
  const movie = await movieModel.findById(req.params.id);
  res.send(movie);
});

app.put('/api/movie/:id', async (req, res) => {
  const { title, year, poster } = req.body;
  const updatedMovie = await movieModel.findByIdAndUpdate(req.params.id, { title, year, poster }, { new: true });
  res.json(updatedMovie);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});