_            = require 'underscore'
redis        = require 'redis'
EventEmitter = require('events').EventEmitter

# Manages the library of music available on the machine
# using a local Redis server instance.
#
# Redis key-value data structure (work in progress):
# 
#   GET artist:the-black-keys
#    => "The Black Keys"
#   GET artist:the-black-keys:albums
#    => ["el-camino"]
#   GET artist:the-black-keys:album:el-camino
#    => "El Camino"
#   GET artist:the-black-keys:album:el-camino:year
#    => 2011 
#   GET artist:the-black-keys:album:el-camino:cover
#    => "/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg"
#   GET artist:the-black-keys:album:el-camino:songs
#    => ["lonely-boy"]
#   GET artist:the-black-keys:album:el-camino:song:lonely-boy
#    => "Lonely Boy"
#   GET artist:the-black-keys:albums:el-camino:song:lonely-boy:audio
#    => "/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3"
class Library extends EventEmitter
  constructor: ->
    @loaded = false
    @settings = {}
    @settings.redis = {}
    @settings.redis.redisDB = 8
    @client = redis.createClient()
    @client.on 'ready', =>
      @client.select @settings.redis.redisDB, (err, reply) =>
        console.log err if err
        @loaded = true
        @emit 'loaded'
    @client.on 'error', (err) ->
      console.log err
    @
  
  withSettings: (settings) ->
    @settings = _.defaults settings, @settings
    @
  
  getArtist: (artist, callback) ->
    @valForKey "artist:#{artist}", (val) ->
      callback
        artist:
          name: val
  
  getAlbum: (artist, album) ->
    resource = "artist:#{artist}:album:#{album}"
    artist:
      @getArtist artist
    album:
      name: @valForKey resource
      year: @valForKey "#{resource}:year"
      songs: (@getSong(artist, album, s) for s in @valForKey("#{resource}:songs"))
  
  getAlbumCoverPath: (artist, album) ->
    @valForKey "artist:#{artist}:album:#{album}:cover"
  
  getSong: (artist, album, song) ->
    @valForKey "artist:#{artist}:album:#{album}:song:#{song}"
  
  getSongAudioPath: (artist, album, song) ->
    @valForKey "artist:#{artist}:album:#{album}:song:#{song}:audio"
  
  valForKey: (key, callback) ->
    @client.get key, (err, reply) ->
      if err
        console.log err
      else
        callback reply
  
  reset: (callback) ->
    @client.flushdb (err, reply) ->
      callback()
  
  close: ->
    @client.quit()

exports.loadLibrary = ->
  new Library()
