class ControlsView extends Backbone.View
  el: 'div.top-bar div.container div.row'
  
  events:
    'click .play-pause': 'togglePlay'
  
  initialize: ->
    @playPauseEl = $(@el).find '.play-pause'
    @progressEl = $(@el).find '.progress-bar span'
    @audio = $('audio').get 0
    $(@audio).bind 'timeupdate', @updateProgressBar
  
  updateProgressBar: =>
    secsLeft = parseInt(@audio.duration - @audio.currentTime, 10)
    percentage = (@audio.currentTime / @audio.duration) * 100
    @progressEl.css(width: percentage + '%')
  
  togglePlay: ->
    if @audio.paused
      @audio.play()
      @setPauseIcon()
    else
      @audio.pause()
      @setPlayIcon()
    false
  
  setPauseIcon: ->
    @playPauseEl.removeClass 'sprite-icons-Play'
    @playPauseEl.addClass 'sprite-icons-Pause'
  
  setPlayIcon: ->
    @playPauseEl.removeClass 'sprite-icons-Pause'
    @playPauseEl.addClass 'sprite-icons-Play'

module.exports = ControlsView
