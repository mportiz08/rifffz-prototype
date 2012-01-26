(function() {
  var EventEmitter, Library, redis, _,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _ = require('underscore');

  redis = require('redis');

  EventEmitter = require('events').EventEmitter;

  Library = (function(_super) {

    __extends(Library, _super);

    Library.prototype.settings = {
      redis: {
        redisDB: 8
      }
    };

    function Library(settings) {
      var _this = this;
      if (settings == null) settings = {};
      _.extend(this.settings, settings);
      this.client = redis.createClient();
      this.client.on('ready', function() {
        return _this.emit('loaded');
      });
      this.client.on('error', function(err) {
        return console.log(err);
      });
      this.client.select(this.settings.redisDB);
    }

    Library.prototype.getClient = function() {
      return this.client;
    };

    Library.prototype.getArtist = function(artist) {
      return {
        name: this.valForKey("artist:" + artist)
      };
    };

    Library.prototype.getAlbum = function(artist, album) {
      var resource, s;
      resource = "artist:" + artist + ":album:" + album;
      return {
        artist: this.getArtist(artist),
        album: {
          name: this.valForKey(resource),
          year: this.valForKey("" + resource + ":year"),
          songs: (function() {
            var _i, _len, _ref, _results;
            _ref = this.valForKey("" + resource + ":songs");
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              s = _ref[_i];
              _results.push(this.getSong(artist, album, s));
            }
            return _results;
          }).call(this)
        }
      };
    };

    Library.prototype.getAlbumCoverPath = function(artist, album) {
      return this.valForKey("artist:" + artist + ":album:" + album + ":cover");
    };

    Library.prototype.getSong = function(artist, album, song) {
      return this.valForKey("artist:" + artist + ":album:" + album + ":song:" + song);
    };

    Library.prototype.getSongAudioPath = function(artist, album, song) {
      return this.valForKey("artist:" + artist + ":album:" + album + ":song:" + song + ":audio");
    };

    Library.prototype.valForKey = function(key) {
      return this.client.get(key, function(err, reply) {
        if (err) {
          return console.log(err);
        } else {
          return reply;
        }
      });
    };

    return Library;

  })(EventEmitter);

  exports.loadLibrary = function() {
    return new Library();
  };

}).call(this);
