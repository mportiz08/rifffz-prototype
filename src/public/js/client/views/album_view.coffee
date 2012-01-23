AlbumCoverView    = require('views/album_cover_view')
AlbumSongListView = require('views/album_song_list_view')

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
    new AlbumCoverView(model: @.model).render()
    new AlbumSongListView(model: @.model).render()
    @

module.exports = AlbumView
