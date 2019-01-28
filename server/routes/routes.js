var dbOperations = require('../services/db-operations');
function initialize(app, db) {
  // '/cops?lat=12.9718915&&lng=77.64115449999997'
  app.get('/cops', function(req, res) {
    //Convert the query strings into Numbers
    var latitude = Number(req.query.lat);
    var longitude = Number(req.query.lng);
    dbOperations.fetchNearestCops(db, [longitude, latitude], function(results) {
      //return the results back to the client in the form of JSON
      res.json({
        cops: results
      });
    });
  });
  app.get('/users', function(req, res) {
    dbOperations.fetchUsers(db, function(results) {
      res.json({ users: results });
    });
  });
}
exports.initialize = initialize;
