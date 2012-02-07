class AlbumSongListView extends Backbone.View
  el: 'ul.album-song-list.unstyled'
  
  render: ->
    $(@el).empty()
    _.each @model.get('songs'), (s) =>
      $(@el).append "<li>#{s}</li>"
    $(@el).find('li').first().addClass 'now-playing'
    $(@el).find('li').first().html "<span class=\"label success\">now playing</span> #{$(@el).find('li').first().html()}"
    @

module.exports = AlbumSongListView
