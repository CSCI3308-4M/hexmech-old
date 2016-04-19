'use strict';
const mongoose = require('mongoose');
const mongodbURI = require('mongodb-uri');
const config = require('config');

// connect to the database
mongoose.connect(config.mongoURI);
const db = mongoose.connection;

// error handler
db.on('error', console.error.bind(console, 'connection error'));

// on successful
db.once('open', () => {
  const dbInfo = mongodbURI.parse(config.mongoURI);
  console.log(
      `Mongoose default connection open to ${dbInfo.database} database.`);
  dbInfo.hosts.forEach((host) => {
    console.log(`Connected to ${host.host} on port ${host.port}.`);
  });
});
