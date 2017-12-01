var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var movies = require('./routes/movies');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/MongoMovieDB')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
