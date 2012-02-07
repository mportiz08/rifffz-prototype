util = require 'util'

class ControlsView extends Backbone.View
  el: 'div.top-bar div.container div.row'
  
  events:
    'click .play-pause': 'togglePlay'
  
  initialize: ->
    #$('audio').attr 'src', "/api/audio/#{util.slugify @model.get('artist')}/#{util.slugify @model.get('name')}/#{util.slugify @model.get('songs')[0]}"
    @changeTrack 0
    
    @playPauseEl = $(@el).find '.play-pause'
    @progressEl = $(@el).find '.progress-bar span'
    @timePassedEl = $(@el).find '.time-passed'
    @timeTotalEl = $(@el).find '.time-total'
    
    @audio = $('audio').get 0
    $(@audio).bind 'canplay', @initDuration
    $(@audio).bind 'timeupdate', @updateProgress
  
  initDuration: =>
    duration = parseInt(@audio.duration, 10)
    durationMins = Math.floor (duration / 60), 10
    durationSecs = duration - (durationMins * 60)
    padding = ''
    padding = '0' if durationSecs < 10
    @timeTotalEl.text(durationMins + ':' + padding + durationSecs)
  
  updateProgress: =>
    @updateProgressBar()
    @updateTimePassed()
  
  updateProgressBar: ->    
    percentage = (@audio.currentTime / @audio.duration) * 100
    @progressEl.css(width: percentage + '%')
  
  updateTimePassed: ->
    timePassed = parseInt(@audio.currentTime, 10)
    timePassedMins = Math.floor (timePassed / 60), 10
    timePassedSecs = timePassed - (timePassedMins * 60)
    padding = ''
    padding = '0' if timePassedSecs < 10
    @timePassedEl.text(timePassedMins + ':' + padding + timePassedSecs)
  
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
  
  changeTrack: (trackNo) ->
    $('audio').attr 'src', "/api/audio/#{util.slugify @model.get('artist')}/#{util.slugify @model.get('name')}/#{util.slugify @model.get('songs')[trackNo]}"
    $('ul.album-song-list.unstyled').trigger('updateNowPlaying', [trackNo])

module.exports = ControlsView
