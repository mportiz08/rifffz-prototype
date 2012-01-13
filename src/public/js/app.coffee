$ ->  
  class Album extends Backbone.Model
  
  class AlbumSongListView extends Backbone.View
    el: 'ul.album-song-list.unstyled'
    
    render: ->
      $(@.el).empty()
      _.each @.model.get('songs'), (s) =>
        console.log "rendering song #{s}"
        $(@.el).append "<li>#{s}</li>"
      @
  
  class Router extends Backbone.Router
    routes:
      ":artist/:album": "album"
    
    album: (artistName, albumName) ->
      console.log 'album route called with: ' + artistName + ', ' + albumName
      $.get "/api/album/#{artistName}/#{albumName}", (data, textStatus, jqXHR) ->
        album = new Album songs: data.album.songs
        songList = new AlbumSongListView model: album#, el: $('ul.album-song-list.unstyled')
        songList.render()
  
  window.router = new Router
  Backbone.history.start()
