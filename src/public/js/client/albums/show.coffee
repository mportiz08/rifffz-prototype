util = require 'util'

loadCover = ->
  artist = $('.album-info .artist-name').text()
  album  = $('.album-info .album-name').text()
  $('.album-cover').css
    'background': "url(\"/api/cover/#{util.slugify artist}/#{util.slugify album}\") no-repeat center center",
    'background-size': 'contain'

$ ->
  loadCover()
