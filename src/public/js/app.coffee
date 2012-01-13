$ ->  
  class Album extends Backbone.Model
    initialize: ->
      # TODO
  
  class Router extends Backbone.Router
    routes:
      "album/:artist/:album": "album"
    
    album: (artistName, albumName) ->
      console.log 'album route called with: ' + artistName + ', ' + albumName
      $.get "/api/album/#{artistName}/#{albumName}", (data, textStatus, jqXHR) ->
        album = new Album songs: data.album.songs
        console.log album
  
  window.router = new Router
  Backbone.history.start()
