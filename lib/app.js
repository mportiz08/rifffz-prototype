(function() {
  var app, express;

  express = require('express');

  app = express.createServer();

  app.set('view engine', 'jade');

  app.set('views', "" + __dirname + "/views");

  app.use(express.static("" + __dirname + "/public"));

  app.get('/', function(req, res) {
    return res.render('index');
  });

  app.get('/test', function(req, res) {
    return res.sendfile('/Users/marcus/Music/iTunes/iTunes\ Media/Music/The\ White\ Stripes/White\ Blood\ Cells/The\ White\ Stripes\ -\ Expecting.mp3');
  });

  exports.loadApp = function() {
    return app;
  };

}).call(this);
