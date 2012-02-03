#should = require 'should'
assert = require 'assert'
rifffz = require '../'

#describe 'Library', ->
#  lib = rifffz.loadLibrary()#.settings(debug: true, redis: { redisDB: 9 })
#  
#  before (done) ->
#    lib.on 'loaded', ->
#      lib.client.set 'artist:the-black-keys', 'The Black Keys', ->
#        done()
#  
#  describe '#getArtist()', ->
#    it 'should return a json representation of the artist', (done) ->
#      lib.getArtist 'the-black-keys', (artist) ->
#        artist.should.equal
#          artist:
#            name: 'The Black Keys'
#        done()
#  
#  after (done) ->
#    lib.reset ->
#      lib.close()
#      done()

lib = rifffz.loadLibrary().withSettings(debug: true, redis: { redisDB: 9 })
lib.on 'loaded', ->
  lib.reset ->
    json = 
      artist:
        name: 'The Black Keys'
      album:
        name: 'El Camino'
        year: '2011'
        cover: '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg'
        songs: ['Lonely Boy']
    lib.addAlbum json
    lib.client.set 'artist:the-black-keys:album:el-camino:song:lonely-boy:audio', '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3'
    lib.getArtist 'the-black-keys', (resp) ->
      assert.equal resp.artist.name, json.artist.name
      lib.getAlbum 'the-black-keys', 'el-camino', (resp) ->
        assert.deepEqual resp, json
        lib.getAlbumCover 'the-black-keys', 'el-camino', (path) ->
          assert.equal path, '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg'
          lib.getSongAudio 'the-black-keys', 'el-camino', 'lonely-boy', (path) ->
            assert.equal path, '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3'
            lib.close()
