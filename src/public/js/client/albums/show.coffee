util     = require 'util'
Controls = require 'albums/controls'

loadCover = ->
  artist = $('.album-info .artist-name').text()
  album  = $('.album-info .album-name').text()
  $('.album-cover').css
    'background': "url(\"/api/cover/#{util.slugify artist}/#{util.slugify album}\") no-repeat center center",
    'background-size': 'contain'

initControls = ->
  artist = $('.album-info .artist-name').text()
  album  = $('.album-info .album-name').text()
  songs = _.map $('.album-song-list a'), (s) -> $(s).text()
  controls = new Controls(artist, album, songs)

$ ->
  loadCover()
  initControls()
