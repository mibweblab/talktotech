// const http = require('http');
// const express = require('express');
// require('./models/User');
// require('./models/Cop');

// // const routes = require('./routes');

// // mongoose
// //   .connect(
// //     keys.mongoURI,
// //     { useNewUrlParser: true }
// //   )
// //   .then(
// //     () => {
// //       console.log('connected to mongoDB MLAB');
// //     },
// //     err => {
// //       console.log("We've encountered an error connecting to your DB: ", err);
// //     }
// //   );
// // require('./routes/routes')(app);

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// app.listen(PORT, () =>
//   console.log('Express server is running on localhost: ', PORT)
// );

var http = require('http');
var express = require('express');
// var consolidate = require('consolidate'); //1
var _ = require('underscore');
var bodyParser = require('body-parser');

var routes = require('./routes/routes'); //File that contains our endpoints
var mongoClient = require('mongodb').MongoClient;
require('./services/passport');
// const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
// const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Initalize mongodb
require('./services/authDb').init();

const keys = require('./config/key');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

//keep cookie session for 30days
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    resave: 'false',
    saveUninitialized: 'true'
  })
);

require('./routes/authRoutes')(app);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.json({ limit: '5mb' }));

app.set('views', 'public'); //Set the folder-name from where you serve the html page.
app.use(express.static('../public')); //setting the folder name (public) where all the static files like css, js, images etc are made available

// app.set('view engine', 'html');
// app.engine('html', consolidate.underscore);
// // var portNumber = 8000; //for locahost:8000

const PORT = process.env.PORT || 3001;
http.createServer(app).listen(PORT, function() {
  //creating the server which is listening to the port number:8000, and calls a function within in which calls the initialize(app) function in the router module
  console.log('Server listening at port ' + PORT);

  app.get('/', (req, res) => {
    res.send({ hi: 'there, you reached the server' });
  });
  // var url = keys.mongoURI;
  // mongoClient.connect(
  //   url,
  //   { native_parser: true },
  //   function(err, db) {
  //     //a connection with the mongodb is established here.
  //     console.log('Connected to MLAB Database');
  //     routes.initialize(app, db); //function defined in routes.js which is exported to be accessed by other modules
  //   }
  // );
});
