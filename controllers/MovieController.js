var mongoose = require("mongoose");

var Movie = require('../models/movie');
var movieController = {};

movieController.list = function(req, res) {
	Movie.find({}).exec(function(err, movies) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.render("../views/index", {
				movies : movies
			});
		}
	});
};

movieController.show = function(req, res) {
	Movie.findOne({
		_id : req.params.id
	}).exec(function(err, movie) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.render("../views/show", {
				movie : movie
			});
		}
	});
};

movieController.save = function(req, res) {
  console.log(req.body);
  var movie = new Movie(req.body);

  movie.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an movie.");
    }
  });
};
	
movieController.delete = function(req, res) {
	Movie.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Movie deleted!");
    }
  });
};
		
module.exports = movieController;