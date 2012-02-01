(function() {
  var EventEmitter, Library, redis, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require('underscore');

  redis = require('redis');

  EventEmitter = require('events').EventEmitter;

  Library = (function(_super) {

    __extends(Library, _super);

    function Library() {
      var _this = this;
      this.loaded = false;
      this.settings = {};
      this.settings.redis = {};
      this.settings.redis.redisDB = 0;
      this.client = redis.createClient();
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

    Library.prototype.setArtist = function(artistSlug, artistName) {
      return this.setVal("artist:" + artistSlug, artistName);
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

    Library.prototype.getAlbum = function(artist, album, callback) {
      var resource,
        _this = this;
      resource = "artist:" + artist + ":album:" + album;
      return this.getArtist(artist, function(artistJSON) {
        return _this.valForKey(resource, function(albumName) {
          return _this.valForKey("" + resource + ":year", function(albumYear) {
            return _this.valForListKey("" + resource + ":songs", function(albumSongs) {
              return callback({
                artist: {
                  name: artistJSON.artist.name
                },
                album: {
                  name: albumName,
                  year: albumYear,
                  songs: albumSongs
                }
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
