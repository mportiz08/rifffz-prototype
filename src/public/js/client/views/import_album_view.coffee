util = require 'util'

class ImportAlbumView extends Backbone.View
  el: 'div#import-album-modal'
  
  events:
    'click a.btn.primary': 'importAlbum'
  
  importAlbum: ->
    $(@el).find('.modal-body').append '<p class="import-status">importing...</p>'
    path = $(@el).find('input.album-path').val()
    $.post '/api/album',
      path: path, (data, textStatus, jqXHR) =>
        $(@el).find('.import-status').remove()
        $(@el).modal 'hide'
        document.location.href = "/\##{data.artist}/#{data.album}"
    false

module.exports = ImportAlbumView
  