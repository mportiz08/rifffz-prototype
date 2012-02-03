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
      var json;
      json = {
        artist: {
          name: 'The Black Keys'
        },
        album: {
          name: 'El Camino',
          year: '2011',
          cover: '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg',
          songs: ['Lonely Boy']
        }
      };
      lib.addAlbum(json);
      lib.client.set('artist:the-black-keys:album:el-camino:song:lonely-boy:audio', '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3');
      return lib.getArtist('the-black-keys', function(resp) {
        assert.equal(resp.artist.name, json.artist.name);
        return lib.getAlbum('the-black-keys', 'el-camino', function(resp) {
          assert.deepEqual(resp, json);
          return lib.getAlbumCover('the-black-keys', 'el-camino', function(path) {
            assert.equal(path, '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg');
            return lib.getSongAudio('the-black-keys', 'el-camino', 'lonely-boy', function(path) {
              assert.equal(path, '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3');
              return lib.close();
            });
          });
        });
      });
    });
  });

}).call(this);
