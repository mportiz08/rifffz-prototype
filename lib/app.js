(function() {
  var app, express, lib;

  express = require('express');

  lib = require('./library').loadLibrary();

  app = express.createServer();

  app.set('view engine', 'jade');

  app.set('views', "" + __dirname + "/views");

  app.use(express.static("" + __dirname + "/public"));

  app.get('/', function(req, res) {
    return res.render('index');
  });

  app.get('/api/audio/:artist/:album/:song', function(req, res) {
    return res.sendfile('/Users/marcus/Music/iTunes/iTunes\ Media/Music/As\ Cities\ Burn/Son,\ I\ Loved\ You\ At\ Your\ Darkest/05\ -\ Terrible\!\ How\ Terrible\ For\ The\ Great\ City\!.mp3');
  });

  app.get('/api/cover/:artist/:album', function(req, res) {
    return lib.getAlbumCover(req.params.artist, req.params.album, function(cover) {
      return res.sendfile(cover);
    });
  });

  app.get('/api/album/:artist/:album', function(req, res) {
    return lib.getAlbum(req.params.artist, req.params.album, function(album) {
      return res.send(album);
    });
  });

  exports.loadApp = function(port) {
    var _this = this;
    return lib.on('loaded', function() {
      console.log("library loaded ✓");
      app.listen(port);
      console.log("rifffz running ✓");
      return console.log("\ncheck it out in your browser at http://127.0.0.1:" + port);
    });
  };

}).call(this);
