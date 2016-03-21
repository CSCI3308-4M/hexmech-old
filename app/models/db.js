"use strict";

var mongoose = require('mongoose');
var mongodbURI = require('mongodb-uri');
var config = require('config');

console.log(config.mongoURI);
// connect to the database
mongoose.connect(config.mongoURI);
var db = mongoose.connection;

// error handler
db.on('error', console.error.bind(console, 'connection error'));

// on successful
db.once('open', function () {
  var dbInfo = mongodbURI.parse(config.mongoURI);
  console.log('Mongoose default connection open to' 
      + dbInfo.database  + ' database.');
  dbInfo.hosts.forEach( function (host) {
    console.log('Connected to ' + host.host + ' on port ' + host.port + '.');
  });
});
