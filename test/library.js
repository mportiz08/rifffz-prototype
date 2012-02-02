(function() {
  var assert, lib, rifffz;

  assert = require('assert');

  rifffz = require('../');

  lib = rifffz.loadLibrary().withSettings({
    debug: true,
    redis: {
      redisDB: 9
    }
  });

  lib.on('loaded', function() {
    return lib.reset(function() {
      lib.addArtist('The Black Keys');
      lib.client.set('artist:the-black-keys:album:el-camino', 'El Camino');
      lib.client.set('artist:the-black-keys:album:el-camino:year', '2011');
      lib.client.set('artist:the-black-keys:album:el-camino:cover', '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg');
      lib.client.rpush('artist:the-black-keys:album:el-camino:songs', 'Lonely Boy');
      lib.client.set('artist:the-black-keys:album:el-camino:song:lonely-boy:audio', '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3');
      return lib.getArtist('the-black-keys', function(artist) {
        assert.deepEqual(artist, {
          artist: {
            name: 'The Black Keys'
          }
        });
        return lib.getAlbum('the-black-keys', 'el-camino', function(album) {
          assert.deepEqual(album, {
            artist: {
              name: 'The Black Keys'
            },
            album: {
              name: 'El Camino',
              year: '2011',
              songs: ['Lonely Boy']
            }
          });
          return lib.getAlbumCover('the-black-keys', 'el-camino', function(path) {
            assert.equal(path, '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg');
            return lib.getSongAudio('the-black-keys', 'el-camino', 'lonely-boy', function(path) {
              assert.equal(path, '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3');
              return process.exit();
            });
          });
        });
      });
    });
  });

}).call(this);
