AlbumCoverView    = require('views/album_cover_view')
AlbumSongListView = require('views/album_song_list_view')

class AlbumView extends Backbone.View
  el: 'div.album-info.span8'
  
  initialize: ->
    @titleEl = $(@el).find 'h1'
    @dateEl = $(@el).find 'small'
    @artistEl = $(@el).find 'h2'
  
  setParams: (params) ->
    @params = params
    @
  
  render: ->
    @titleEl.empty()
    @dateEl.empty()
    @artistEl.empty()
    @titleEl.text @model.get('name')
    @dateEl.text "#{@model.get('year')}"
    @artistEl.text @model.get('artist')
    new AlbumCoverView(model: @model).setParams(@params).render()
    new AlbumSongListView(model: @model).render()
    @

module.exports = AlbumView
