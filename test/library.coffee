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
  lib.client.set 'artist:the-black-keys', 'The Black Keys', ->
    lib.getArtist 'the-black-keys', (artist) ->
      assert.deepEqual artist,
        artist:
          name: 'The Black Keys'
      process.exit()
