Album        = require('models/album')
AlbumView    = require('views/album_view')
ControlsView = require('views/controls_view')

class Router extends Backbone.Router
  routes:
    ":artist/:album": "album"
  
  album: (artistName, albumName) ->
    $.get "/api/album/#{artistName}/#{albumName}", (data, textStatus, jqXHR) ->
      album = new Album
        name: data.album.name
        year: data.album.year
        artist: data.artist.name
        songs: data.album.songs
      albumView = new AlbumView model: album
      albumView.render()
      controlsView = new ControlsView()
      controlsView.render()

module.exports = Router
