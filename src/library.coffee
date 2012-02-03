_            = require 'underscore'
redis        = require 'redis'
EventEmitter = require('events').EventEmitter
util         = require('./util').Util

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
    @settings.redis.redisDB = 0
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
  
  addArtist: (artist) ->
    @setVal "artist:#{util.slugify artist}", artist
  
  getArtist: (artist, callback) ->
    @valForKey "artist:#{artist}", (val) ->
      callback
        artist:
          name: val
  
  addAlbum: (json) ->
    @addArtist json.artist.name
    resource = "artist:#{util.slugify json.artist.name}:album:#{util.slugify json.album.name}"
    @setVal resource, json.album.name
    @setVal "#{resource}:year", json.album.year
    @setVal "#{resource}:cover", json.album.cover
    @client.rpush "#{resource}:songs", song for song in json.album.songs
  
  getAlbum: (artist, album, callback) ->
    resource = "artist:#{artist}:album:#{album}"
    @getArtist artist, (artistJSON) =>
      @valForKey resource, (albumName) =>
        @valForKey "#{resource}:year", (albumYear) =>
          @valForKey "#{resource}:cover", (albumCover) =>
            @valForListKey "#{resource}:songs", (albumSongs) =>
              callback
                artist:
                  name: artistJSON.artist.name
                album:
                  name: albumName
                  year: albumYear
                  cover: albumCover
                  songs: albumSongs
  
  getAlbumCover: (artist, album, callback) ->
    @valForKey "artist:#{artist}:album:#{album}:cover", (val) ->
      callback val
  
  getSongAudio: (artist, album, song, callback) ->
    @valForKey "artist:#{artist}:album:#{album}:song:#{song}:audio", (val) ->
      callback val
  
  setVal: (key, val) ->
    @client.set key, val, (err, reply) ->
      console.log err if err
  
  valForKey: (key, callback) ->
    @client.get key, (err, reply) ->
      if err
        console.log err
      else
        callback reply
  
  valForListKey: (key, callback) ->
    @client.llen key, (err, reply) =>
      if err
        console.log err
      else
        @client.lrange key, 0, reply, (err, reply) ->
          callback reply
  
  reset: (callback) ->
    @client.flushdb (err, reply) ->
      callback()
  
  close: ->
    @client.quit()

exports.loadLibrary = ->
  new Library()
