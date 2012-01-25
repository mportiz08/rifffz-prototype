(function() {
  var Library, redis;

  redis = require('redis');

  Library = (function() {

    function Library() {}

    Library.prototype.initialize = function() {
      return this.client = redis.createClient();
    };

    Library.prototype.getArtist = function() {};

    Library.prototype.getAlbum = function() {};

    Library.prototype.getSong = function() {};

    return Library;

  })();

  exports.loadLibrary = function() {
    return new Library();
  };

}).call(this);
