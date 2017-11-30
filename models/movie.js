var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  movie_name: String,
  genre: String,
  release_date: String,
  budget: Number,
  revenue: Number,
  rating: String,
  price: Number,
  overview: String,
  runtime: Number,
  tagline: String,
  production_companies: String,
  cast: String,
  crew: String
});

module.exports = mongoose.model('Movie', MovieSchema);