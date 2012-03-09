(function() {
  var importAlbum, util;

  util = require('util');

  importAlbum = function() {
    var el, path,
      _this = this;
    el = '#import-album-modal';
    $(el).find('.modal-body').append('<p class="import-status">importing...</p>');
    path = $(el).find('input.album-path').val();
    $.post('/api/album', {
      path: path
    }, function(data, textStatus, jqXHR) {
      $(el).find('.import-status').remove();
      $(el).modal('hide');
      if (data.albums != null) {
        return document.location.href = '/';
      } else {
        return document.location.href = "/" + data.artist + "/" + data.album;
      }
    });
    return false;
  };

  $(function() {
    return $('#import-album-modal a.btn.primary').click(importAlbum);
  });

}).call(this);
