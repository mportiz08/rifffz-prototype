(function() {
  var app, express;

  express = require('express');

  app = express.createServer();

  app.get('/', function(req, res) {
    return res.send('hello, world');
  });

  app.get('/test', function(req, res) {
    return res.sendfile('/Users/marcus/Music/iTunes/iTunes\ Media/Music/The\ White\ Stripes/White\ Blood\ Cells/The\ White\ Stripes\ -\ Expecting.mp3');
  });

  exports.loadApp = function() {
    return app;
  };

}).call(this);
