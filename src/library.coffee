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
#   GET artist:the-black-keys:albums:el-camino
#    => "El Camino"
#   GET artist:the-black-keys:albums:el-camino:year
#    => 2011 
#   GET artist:the-black-keys:albums:el-camino:cover
#    => "/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg"
#   GET artist:the-black-keys:albums:el-camino:songs
#    => ["lonely-boy"]
#   GET artist:the-black-keys:albums:el-camino:songs:lonely-boy
#    => "Lonely Boy"
#   GET artist:the-black-keys:albums:el-camino:songs:lonely-boy:audio
#    => "/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3"
class Library
  initialize: ->
    @client = redis.createClient()
  
  getArtist: ->
    # TODO
  
  getAlbum: ->
    # TODO
  
  getSong: ->
    # TODO

exports.loadLibrary = ->
  new Library()
