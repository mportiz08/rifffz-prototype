should = require 'should'
rifffz = require '../'
redis  = require 'redis'

lib = rifffz.loadLibrary().settings(debug: true, redis: { redisDB: 9 })

runTest = ->
  lib.valForKey 'the-black-keys', (reply) ->
    console.log reply
    lib.client.quit()

lib.on 'loaded', =>
  console.log 'lib loaded'
  lib.client.set 'the-black-keys', 'The Black Keys', (err, reply) ->
    runTest()
