class ImportAlbumView extends Backbone.View
  el: 'div#import-album-modal'
  
  events:
    'click a.btn.primary': 'importAlbum'
  
  importAlbum: ->
    console.log 'importing album'

module.exports = ImportAlbumView
  