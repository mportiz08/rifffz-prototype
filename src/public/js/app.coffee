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
  
  class ControlsView extends Backbone.View
    el: 'div.top-bar div.container div.row'
    
    events:
      'click .play-pause': 'togglePlay'
    
    initialize: ->
      @playPauseEl = $(@.el).find '.play-pause'
      @audio = $('audio').get 0
    
    togglePlay: ->
      console.log 'toggling'
      if @audio.paused
        @audio.play()
        @.setPauseIcon()
      else
        @audio.pause()
        @.setPlayIcon()
      false
    
    setPauseIcon: ->
      @playPauseEl.removeClass 'sprite-icons-Play'
      @playPauseEl.addClass 'sprite-icons-Pause'
    
    setPlayIcon: ->
      @playPauseEl.removeClass 'sprite-icons-Pause'
      @playPauseEl.addClass 'sprite-icons-Play'
  
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
  
  window.router = new Router
  Backbone.history.start()
