const passport = require('passport');

module.exports = app => {
  //pass user to passport where they will be authenticated
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  //callback route handler
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  // api endpoints
  app.get('/api/current_user', function(req, res) {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.send({});
    }
  });

  app.get('/user', function(req, res) {
    const users = mongo.getDb().collection('users');
    users
      .findOne({ _id: ObjectId(req.query._id) })
      .then(user => {
        res.send(user);
      })
      .catch(console.log);
  });

  // //whenever someone makes a get request to our app, we will have a route that returns whoever is currently logged in
  // app.get('/api/current_user', (req, res) => {
  //   res.send(req.user);
  //   // console.log(req);
  //   console.log('your request came from:', req.user);
  // });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // 404 route
  app.use(function(req, res, next) {
    const err = new Error('Something went terribly wrong. Please try again!');
    err.status = 404;
    next(err);
  });

  // route error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      status: err.status,
      message: err.message
    });
  });
  //Request handler for whenever a user makes a get request to log out of our app
  app.get('/api/logout', (req, res) => {
    req.logout(); //passport function to log out, it kills the cookie
    // res.send(req.user);
    res.redirect('/');
  });
};
