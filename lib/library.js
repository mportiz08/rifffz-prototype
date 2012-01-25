(function() {
  var Library, redis;

  redis = require('redis');

  Library = (function() {

    function Library() {}

    Library.prototype.initialize = function() {
      return this.client = redis.createClient();
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

  })();

  exports.loadLibrary = function() {
    return new Library();
  };

}).call(this);
