class AlbumSongListView extends Backbone.View
  el: 'ul.album-song-list.unstyled'
  
  render: ->
    $(@.el).empty()
    _.each @.model.get('songs'), (s) =>
      $(@.el).append "<li>#{s}</li>"
    @

module.exports = AlbumSongListView
