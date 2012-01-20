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

module.exports = ControlsView
