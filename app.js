var Path = require('path'),
    Hapi = require('hapi'),
    Good = require('good'),
    Mongoose = require('mongoose'),
    db = require('./config/db');

var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost';

Mongoose.connect(dbURI);

var routes = require('./routes/index');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT || 3000
})

server.route(routes);

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function (err) {
  if (err) {
    throw err;
  }
});

server.start(function() {
  console.log('Running at ' + server.info.uri)
});
