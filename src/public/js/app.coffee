$ ->  
  class Album extends Backbone.Model
  
  class AlbumView extends Backbone.View
    el: 'div.album-info.span8'
    
    initialize: ->
      @titleEl = $(@.el).find 'h1'
      @artistEl = $(@.el).find 'h2'
    
    render: ->
      @titleEl.empty()
      @artistEl.empty()
      @titleEl.text @.model.get('name')
      @titleEl.append "<span class=\"album-year-released\">&nbsp;(#{@.model.get('year')})</span>"
      @artistEl.text @.model.get('artist')
      new AlbumSongListView(model: @.model).render()
      @
  
  class AlbumSongListView extends Backbone.View
    el: 'ul.album-song-list.unstyled'
    
    render: ->
      $(@.el).empty()
      _.each @.model.get('songs'), (s) =>
        $(@.el).append "<li>#{s}</li>"
      @
  
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
  
  window.router = new Router
  Backbone.history.start()
