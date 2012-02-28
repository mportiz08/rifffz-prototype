(function() {
  var EventEmitter, Library, client, redis, util, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require('underscore');

  redis = require('redis');

  EventEmitter = require('events').EventEmitter;

  util = require('./util').Util;

  client = redis.createClient();

  Library = (function(_super) {

    __extends(Library, _super);

    function Library() {
      var _this = this;
      this.loaded = false;
      this.settings = {};
      this.settings.redis = {};
      this.settings.redis.redisDB = 0;
      this.client = client;
      this.client.on('ready', function() {
        return _this.client.select(_this.settings.redis.redisDB, function(err, reply) {
          if (err) console.log(err);
          _this.loaded = true;
          return _this.emit('loaded');
        });
      });
      this.client.on('error', function(err) {
        return console.log(err);
      });
      this;
    }

    Library.prototype.withSettings = function(settings) {
      this.settings = _.defaults(settings, this.settings);
      return this;
    };

    Library.prototype.addArtist = function(artist) {
      return this.setVal("artist:" + (util.slugify(artist)), artist);
    };

    Library.prototype.getArtist = function(artist, callback) {
      return this.valForKey("artist:" + artist, function(val) {
        return callback({
          artist: {
            name: val
          }
        });
      });
    };

    Library.prototype.addAlbum = function(info, callback) {
      var resource, song, _i, _j, _len, _len2, _ref, _ref2;
      this.addArtist(info.artist.name);
      resource = "artist:" + (util.slugify(info.artist.name)) + ":album:" + (util.slugify(info.album.name));
      this.setVal(resource, info.album.name);
      this.setVal("" + resource + ":year", info.album.year);
      this.setVal("" + resource + ":cover", info.album.cover);
      _ref = info.album.songs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        song = _ref[_i];
        this.client.rpush("" + resource + ":songs", song.name);
      }
      _ref2 = info.album.songs;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        song = _ref2[_j];
        this.setVal("" + resource + ":song:" + (util.slugify(song.name)) + ":audio", song.path);
      }
      this.client.rpush('albums:all', "" + (util.slugify(info.artist.name)) + ":" + (util.slugify(info.album.name)));
      if (callback != null) {
        return callback(util.slugify(info.artist.name), util.slugify(info.album.name));
      }
    };

    Library.prototype.getAlbums = function(callback) {
      var _this = this;
      return this.valForListKey('albums:all', function(albumKeys) {
        var albums;
        albums = [];
        return _.each(albumKeys, function(key) {
          var params;
          params = key.split(':');
          return _this.valForKey("artist:" + params[0], function(artist) {
            return _this.valForKey("artist:" + params[0] + ":album:" + params[1], function(album) {
              albums.push({
                artist: artist,
                name: album,
                cover: "/api/cover/" + params[0] + "/" + params[1],
                path: "/" + params[0] + "/" + params[1]
              });
              if (albums.length === albumKeys.length) return callback(albums);
            });
          });
        });
      });
    };

    Library.prototype.getAlbum = function(artist, album, callback) {
      var resource,
        _this = this;
      resource = "artist:" + artist + ":album:" + album;
      return this.getArtist(artist, function(artistJSON) {
        return _this.valForKey(resource, function(albumName) {
          return _this.valForKey("" + resource + ":year", function(albumYear) {
            return _this.valForKey("" + resource + ":cover", function(albumCover) {
              return _this.valForListKey("" + resource + ":songs", function(albumSongs) {
                return callback({
                  artist: {
                    name: artistJSON.artist.name
                  },
                  album: {
                    name: albumName,
                    year: albumYear,
                    cover: albumCover,
                    songs: albumSongs
                  }
                });
              });
            });
          });
        });
      });
    };

    Library.prototype.getAlbumCover = function(artist, album, callback) {
      return this.valForKey("artist:" + artist + ":album:" + album + ":cover", function(val) {
        return callback(val);
      });
    };

    Library.prototype.getSongAudio = function(artist, album, song, callback) {
      return this.valForKey("artist:" + artist + ":album:" + album + ":song:" + song + ":audio", function(val) {
        return callback(val);
      });
    };

    Library.prototype.setVal = function(key, val) {
      return this.client.set(key, val, function(err, reply) {
        if (err) return console.log(err);
      });
    };

    Library.prototype.valForKey = function(key, callback) {
      return this.client.get(key, function(err, reply) {
        if (err) {
          return console.log(err);
        } else {
          return callback(reply);
        }
      });
    };

    Library.prototype.valForListKey = function(key, callback) {
      var _this = this;
      return this.client.llen(key, function(err, reply) {
        if (err) {
          return console.log(err);
        } else {
          return _this.client.lrange(key, 0, reply, function(err, reply) {
            return callback(reply);
          });
        }
      });
    };

    Library.prototype.reset = function(callback) {
      return this.client.flushdb(function(err, reply) {
        return callback();
      });
    };

    Library.prototype.close = function() {
      return this.client.quit();
    };

    return Library;

  })(EventEmitter);

  exports.loadLibrary = function() {
    return new Library();
  };

}).call(this);
