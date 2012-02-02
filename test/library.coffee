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
    lib.addArtist 'The Black Keys'
    lib.client.set 'artist:the-black-keys:album:el-camino', 'El Camino'
    lib.client.set 'artist:the-black-keys:album:el-camino:year', '2011'
    lib.client.set 'artist:the-black-keys:album:el-camino:cover', '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg'
    lib.client.rpush 'artist:the-black-keys:album:el-camino:songs', 'Lonely Boy'
    lib.client.set 'artist:the-black-keys:album:el-camino:song:lonely-boy:audio', '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3'
    lib.getArtist 'the-black-keys', (artist) ->
      assert.deepEqual artist,
        artist:
          name: 'The Black Keys'
      lib.getAlbum 'the-black-keys', 'el-camino', (album) ->
        assert.deepEqual album,
          artist:
            name: 'The Black Keys'
          album:
            name: 'El Camino'
            year: '2011'
            songs: ['Lonely Boy']
        lib.getAlbumCover 'the-black-keys', 'el-camino', (path) ->
          assert.equal path, '/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg'
          lib.getSongAudio 'the-black-keys', 'el-camino', 'lonely-boy', (path) ->
            assert.equal path, '/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3'
            process.exit()
