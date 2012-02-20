(function() {
  var ImportAlbumView, util,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  util = require('util');

  ImportAlbumView = (function(_super) {

    __extends(ImportAlbumView, _super);

    function ImportAlbumView() {
      ImportAlbumView.__super__.constructor.apply(this, arguments);
    }

    ImportAlbumView.prototype.el = 'div#import-album-modal';

    ImportAlbumView.prototype.events = {
      'click a.btn.primary': 'importAlbum'
    };

    ImportAlbumView.prototype.importAlbum = function() {
      var path,
        _this = this;
      $(this.el).find('.modal-body').append('<p class="import-status">importing...</p>');
      path = $(this.el).find('input.album-path').val();
      $.post('/api/album', {
        path: path
      }, function(data, textStatus, jqXHR) {
        $(_this.el).find('.import-status').remove();
        $(_this.el).modal('hide');
        return document.location.href = "/\#" + data.artist + "/" + data.album;
      });
      return false;
    };

    return ImportAlbumView;

  })(Backbone.View);

  module.exports = ImportAlbumView;

}).call(this);