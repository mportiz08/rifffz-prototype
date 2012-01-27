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
    return lib.valForKey('the-black-keys', function(reply) {
      console.log(reply);
      return lib.client.quit();
    });
  };

  lib.on('loaded', function() {
    console.log('lib loaded');
    return lib.client.set('the-black-keys', 'The Black Keys', function(err, reply) {
      return runTest();
    });
  });

}).call(this);
