const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const pino = require('express-pino-logger')();
// const cors = require('cors')();

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(pino);

// app.use(cors());

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json()); //to parse incoming json data

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
