var express = require('express');
var router = express.Router();

var movie = require("../controllers/MovieController.js");

//Get all movies
router.get('/', movie.list);

// Get single movie by id
router.get('/show/:id', movie.show);

//Save employee
router.post('/save', movie.save);

//Edit update
router.post('/delete/:id', movie.delete);

module.exports = router;