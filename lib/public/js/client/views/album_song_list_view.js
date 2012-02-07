(function() {
  var AlbumSongListView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  AlbumSongListView = (function(_super) {

    __extends(AlbumSongListView, _super);

    function AlbumSongListView() {
      AlbumSongListView.__super__.constructor.apply(this, arguments);
    }

    AlbumSongListView.prototype.el = 'ul.album-song-list.unstyled';

    AlbumSongListView.prototype.render = function() {
      var _this = this;
      $(this.el).empty();
      _.each(this.model.get('songs'), function(s) {
        return $(_this.el).append("<li>" + s + "</li>");
      });
      $(this.el).find('li').first().addClass('now-playing');
      $(this.el).find('li').first().html("<span class=\"label success\">now playing</span> " + ($(this.el).find('li').first().html()));
      return this;
    };

    return AlbumSongListView;

  })(Backbone.View);

  module.exports = AlbumSongListView;

}).call(this);
