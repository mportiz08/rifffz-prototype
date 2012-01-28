(function() {
  var lib, redis, rifffz, runTest, should,
    _this = this;

  should = require('should');

  rifffz = require('../');

  redis = require('redis');

  lib = rifffz.loadLibrary().settings({
    debug: true,
    redis: {
      redisDB: 9
    }
  });

  runTest = function() {
    return lib.getArtist('the-black-keys', function(artist) {
      console.log(artist);
      return lib.reset(function() {
        return lib.close();
      });
    });
  };

  lib.on('loaded', function() {
    return lib.client.set('artist:the-black-keys', 'The Black Keys', function(err, reply) {
      return runTest();
    });
  });

}).call(this);
