const express = require('express');
const Joi = require('joi'); //for data validation

const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object()
  .keys({
    name: Joi.string()
      .min(1)
      .max(100)
      .required(),
    message: Joi.string()
      .min(2)
      .max(500)
      .required(),
    latitude: Joi.number()
      .min(-90)
      .max(90)
      .required(),
    longitude: Joi.number()
      .min(-180)
      .max(180)
      .required(),
    date: Joi.date()
  })
  .with('username', 'birthyear')
  .without('password', 'access_token');

const router = express.Router();

router.get('/', (req, res) => {
  messages.find().then(allMessages => {
    res.json(allMessages);
  });
});

router.post('/', (req, res, next) => {
  //add current time
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    console.log(result);
    //take the info, add current time
    const { name, message, latitude, longitude } = req.body;
    const userMessage = {
      name,
      message,
      latitude,
      longitude,
      date: new Date()
    };
    //insert into DB
    console.log(userMessage);
    messages.insert(userMessage).then(insertedMessage => {
      res.json(insertedMessage);
    });
  } else {
    //next...forward it to our error handling function
    next(result.error);
  }
});

module.exports = router;
