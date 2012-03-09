(function() {
  var ID3, Importer, fs, path, util, _;

  _ = require('underscore');

  fs = require('fs');

  ID3 = require('id3');

  path = require('path');

  util = require('./util').Util;

  Importer = (function() {

    function Importer() {}

    Importer.prototype.albumExistsAt = function(absPath, callback) {
      var _this = this;
      return fs.readdir(absPath, function(err, paths) {
        var mp3, mp3s;
        mp3s = (function() {
          var _i, _len, _ref, _results;
          _ref = util.onlyMP3s(paths);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            mp3 = _ref[_i];
            _results.push(path.join(absPath, mp3));
          }
          return _results;
        })();
        return callback(mp3s.length > 0);
      });
    };

    Importer.prototype.importAlbum = function(dir, callback) {
      var _this = this;
      return fs.readdir(dir, function(err, files) {
        var mp3, mp3s;
        mp3s = (function() {
          var _i, _len, _ref, _results;
          _ref = util.onlyMP3s(files);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            mp3 = _ref[_i];
            _results.push(path.join(dir, mp3));
          }
          return _results;
        })();
        return _this.getAlbumInfo(mp3s[0], function(info) {
          info.album.songs = _this.getSongs(mp3s);
          return callback(info);
        });
      });
    };

    Importer.prototype.importAlbums = function(dir, callback) {
      var albums,
        _this = this;
      albums = [];
      return fs.readdir(dir, function(err, subdirs) {
        return _.each(subdirs, function(subdir) {
          return _this.importAlbum(path.join(dir, subdir), function(info) {
            albums.push(info);
            if (albums.length === subdirs.length) return callback(albums);
          });
        });
      });
    };

    Importer.prototype.getAlbumInfo = function(file, callback) {
      return fs.readFile(file, function(err, data) {
        var id3;
        id3 = new ID3(data);
        id3.parse();
        return callback({
          artist: {
            name: id3.get('artist')
          },
          album: {
            name: id3.get('album'),
            year: id3.get('year'),
            cover: id3.get('picture').data.toString('binary')
          }
        });
      });
    };

    Importer.prototype.getSongs = function(files) {
      return _.map(files, function(file) {
        var id3, song;
        song = {};
        id3 = new ID3(fs.readFileSync(file));
        id3.parse();
        song.name = id3.get('title');
        song.path = file;
        return song;
      });
    };

    return Importer;

  })();

  exports.Importer = Importer;

}).call(this);
