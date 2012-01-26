(function() {
  var rifffz;

  rifffz = require('../');

  describe('Library', function() {
    var lib;
    lib = rifffz.loadLibrary({
      redisDB: 9
    });
    before(function() {
      return lib.client.flushdb();
    });
    return describe('#getArtist()', function() {
      return it('should return a json representation of the artist', function() {
        return lib.getArtist("the-black-keys").should.equal({
          artist: {
            name: 'The Black Keys'
          }
        });
      });
    });
  });

}).call(this);
