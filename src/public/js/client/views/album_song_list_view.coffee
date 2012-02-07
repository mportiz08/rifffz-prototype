class AlbumSongListView extends Backbone.View
  el: 'ul.album-song-list.unstyled'
  events:
    'updateNowPlaying': 'updateNowPlaying'
    'click li a': 'chooseSong'
  
  render: ->
    $(@el).empty()
    _.each @model.get('songs'), (s) =>
      $(@el).append "<li><a href=\"#\">#{s}</a></li>"
    @
  
  chooseSong: (e) ->
    trackNo = $(e.target).parent().prevAll().length
    window.controls.changeTrack trackNo
    false
  
  updateNowPlaying: (e, trackNo) ->
    console.log 'update called'
    trackEl = $(@el).find('li').eq trackNo
    $('.now-playing .label').remove()
    $('.now-playing').removeClass 'now-playing'
    $(trackEl).addClass 'now-playing'
    $(trackEl).html "<span class=\"label success\">now playing</span> #{$(trackEl).html()}"

module.exports = AlbumSongListView
