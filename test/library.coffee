should = require 'should'
rifffz = require '../'
redis  = require 'redis'

lib = rifffz.loadLibrary().settings(debug: true, redis: { redisDB: 9 })

runTest = ->
  lib.getArtist 'the-black-keys', (artist) ->
    console.log artist
    lib.reset ->
      lib.close()

lib.on 'loaded', =>
  lib.client.set 'artist:the-black-keys', 'The Black Keys', (err, reply) ->
    runTest()
