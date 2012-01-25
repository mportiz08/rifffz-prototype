redis = require 'redis'

# Manages the library of music available on the machine
# using a local Redis server instance.
#
# Here's the outline of how Redis is used to retrieve data:
# 
#   GET artist:1000        => "The Black Keys"
#   GET artist:1000:albums => [2000, 2001]
# 
#   GET album:2000         => "El Camino"
#   GET album:2000:year    => 2011
#   GET album:2000:cover   => "/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg"
#   GET album:2000:songs   => [3000, 3001, 3002, 3003, 3004,
#                              3005, 3006, 3007, 3008, 3009]
# 
#   GET song:3000          => "Lonely Boy"
#   GET song:3000:path     => "/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3"
#
# Here's the outline of how Redis is used to store data:
# 
#   SET song:3000 "Lonely Boy"
#   SET song:3000:path "/Users/marcus/Music/TheBlackKeys/ElCamino/LonelyBoy.mp3"
# 
#   SET album:2000 "El Camino"
#   SET album:2000:year 2011
#   SET album:2000:cover "/Users/marcus/Music/TheBlackKeys/ElCamino/folder.jpg"
#   LPUSH album:2000:songs 3000
# 
#   SET artist:1000 "The Black Keys"
#   LPUSH artist:1000:albums 2000
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
