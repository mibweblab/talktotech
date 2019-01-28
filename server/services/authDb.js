const MongoClient = require('mongodb').MongoClient;
const keys = require('../config/key');

// set up mongoDB connection
// Example URI ---> mongodb+srv://weblab:6jYctMizX5Y5ie6W@catbook-fsjig.mongodb.net?retryWrites=true
// const mongoURL = keys.mongoURI;

const client = new MongoClient(keys.mongoURI, { useNewUrlParser: true });

let _db;
module.exports = {
  init: () => {
    return client
      .connect()
      .then(() => {
        // connect to the db with this name
        _db = client.db('taltotech');
        console.log('Successfully connected to MLAB!');
        return _db;
      })
      .catch(err => {
        console.log('Failed to connect to MLAB');
        console.log(err);
      });
  },

  // Return a reference to the database
  getDb: () => _db
};
