const monk = require('monk');
const keys = require('./config/key');
const db = monk(keys.mongoURI);

module.exports = db;
