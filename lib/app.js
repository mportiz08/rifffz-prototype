(function() {
  var app, client, express, lib, stitch;

  express = require('express');

  lib = require('./library').loadLibrary();

  stitch = require('stitch');

  client = stitch.createPackage({
    paths: [__dirname + '/public/js/client']
  });

  app = express.createServer();

  app.set('view engine', 'jade');

  app.set('views', "" + __dirname + "/views");

  app.use(express.static("" + __dirname + "/public"));

  app.get('/js/client.js', client.createServer());

  app.get('/', function(req, res) {
    return res.render('index');
  });

  app.get('/api/audio/:artist/:album/:song', function(req, res) {
    return lib.getSongAudio(req.params.artist, req.params.album, req.params.song, function(audio) {
      return res.sendfile(audio);
    });
  });

  app.get('/api/cover/:artist/:album', function(req, res) {
    return lib.getAlbumCover(req.params.artist, req.params.album, function(cover) {
      return res.send(new Buffer(cover, 'binary'));
    });
  });

  app.get('/api/album/:artist/:album', function(req, res) {
    return lib.getAlbum(req.params.artist, req.params.album, function(album) {
      return res.send(album);
    });
  });

  exports.loadApp = function(port) {
    return lib.on('loaded', function() {
      console.log("library loaded ✓");
      app.listen(port);
      console.log("rifffz running ✓");
      return console.log("\ncheck it out in your browser at http://127.0.0.1:" + port);
    });
  };

  exports.resetLibrary = function() {
    return lib.on('loaded', function() {
      return lib.reset(function() {
        lib.close();
        return console.log('library reset ✓');
      });
    });
  };

}).call(this);
