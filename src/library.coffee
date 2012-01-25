redis = require 'redis'

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
class Library
  initialize: ->
    @client = redis.createClient()
  
  getArtist: (artist) ->
    name: @valForKey "artist:#{artist}"
  
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
  
  valForKey: (key) ->
    @client.get key, (err, reply) ->
      if err then console.log err else reply

exports.loadLibrary = ->
  new Library()
