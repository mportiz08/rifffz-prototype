(function() {
  var assert, lib, rifffz;

  assert = require('assert');

  rifffz = require('../');

  lib = rifffz.loadLibrary();

  lib.on('loaded', function() {
    return lib.client.set('artist:the-black-keys', 'The Black Keys', function() {
      return lib.getArtist('the-black-keys', function(artist) {
        assert.deepEqual(artist, {
          artist: {
            name: 'The Black Keys'
          }
        });
        return process.exit();
      });
    });
  });

}).call(this);
