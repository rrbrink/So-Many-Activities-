
// var cookieParser = require('cookie-parser');
// var expressValidator = require('express-validator');
// var flash = require('connect-flash');
// var passport = require('passport');
// var localStrategy = require('passport-local'), Strategy;
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSIONSECRET || config.sessionSecret || "cat",
  resave: false,
  saveUninitialized: true
}));

// this is for auth if you choose to use it
function userSetup(req, res, next) {
  if (!req.session.user) {
    req.session.user = {}
    req.session.user.loggedIn = false;
    req.session.user.isAdmin = false;
  }
  next()
}

//using middlewhere acrossed the entire application before any route gets hit.
app.use(userSetup)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/So-Many-Activities';

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function () {
  console.log("Listening on port: " + PORT);
});