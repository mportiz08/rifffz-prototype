(function() {
  var Importer, app, client, express, lib, stitch, _;

  _ = require('underscore');

  express = require('express');

  Importer = require('./importer').Importer;

  lib = require('./library').loadLibrary();

  stitch = require('stitch');

  client = stitch.createPackage({
    paths: [__dirname + '/public/js/client']
  });

  app = express.createServer();

  app.set('view engine', 'jade');

  app.set('views', "" + __dirname + "/views");

  app.use(express.static("" + __dirname + "/public"));

  app.use(express.bodyParser());

  app.get('/js/client.js', client.createServer());

  app.get('/', function(req, res) {
    return lib.getAlbums(function(albums) {
      return res.render('albums', {
        albums: albums
      });
    });
  });

  app.get('/:artist/:album', function(req, res) {
    return lib.getAlbum(req.params.artist, req.params.album, function(info) {
      return res.render('albums/show', {
        artist: info.artist,
        album: info.album
      });
    });
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

  app.post('/api/album', function(req, res) {
    var i;
    i = new Importer();
    return i.albumExistsAt(req.body.path, function(isAlbum) {
      if (isAlbum) {
        return i.importAlbum(req.body.path, function(info) {
          return lib.addAlbum(info, function(artist, album) {
            return res.send({
              artist: artist,
              album: album
            });
          });
        });
      } else {
        return i.importAlbums(req.body.path, function(list) {
          var albums;
          albums = [];
          return _.each(list, function(info) {
            return lib.addAlbum(info, function(artist, album) {
              albums.push({
                artist: artist,
                album: album
              });
              if (albums.length === list.length) return res.send(albums);
            });
          });
        });
      }
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
