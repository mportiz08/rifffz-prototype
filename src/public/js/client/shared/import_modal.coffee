util = require 'util'

importAlbum = ->
  el = '#import-album-modal'
  $(el).find('.modal-body').append '<p class="import-status">importing...</p>'
  path = $(el).find('input.album-path').val()
  $.post '/api/album',
    path: path, (data, textStatus, jqXHR) =>
      $(el).find('.import-status').remove()
      $(el).modal 'hide'
      document.location.href = "/\##{data.artist}/#{data.album}"
  false

$ ->
  $('#import-album-modal a.btn.primary').click importAlbum
