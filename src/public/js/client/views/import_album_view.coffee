util = require 'util'

class ImportAlbumView extends Backbone.View
  el: 'div#import-album-modal'
  
  events:
    'click a.btn.primary': 'importAlbum'
  
  importAlbum: ->
    path = $(@el).find('input.album-path').val()
    $.post '/api/album',
      path: path, (data, textStatus, jqXHR) =>
        console.log 'success'
        #$(@el).find('.modal-body').append '<div class="alert-message success">post finished</div>'
    false

module.exports = ImportAlbumView
  