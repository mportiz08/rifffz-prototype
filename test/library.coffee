rifffz = require '../'

describe 'Library', ->
  lib = rifffz.loadLibrary(redisDB: 9)
  
  before ->
    lib.client.flushdb()
  
  describe '#getArtist()', ->
    it 'should return a json representation of the artist', ->
      lib.getArtist("the-black-keys").should.equal
        artist:
          name: 'The Black Keys'
