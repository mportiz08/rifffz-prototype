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

    AlbumSongListView.prototype.events = {
      'updateNowPlaying': 'updateNowPlaying',
      'click li a': 'chooseSong'
    };

    AlbumSongListView.prototype.render = function() {
      var _this = this;
      $(this.el).empty();
      _.each(this.model.get('songs'), function(s) {
        return $(_this.el).append("<li><a href=\"#\">" + s + "</a></li>");
      });
      return this;
    };

    AlbumSongListView.prototype.chooseSong = function(e) {
      var trackNo;
      trackNo = $(e.target).parent().prevAll().length;
      window.controls.changeTrack(trackNo);
      return false;
    };

    AlbumSongListView.prototype.updateNowPlaying = function(e, trackNo) {
      var trackEl;
      trackEl = $(this.el).find('li').eq(trackNo);
      $('.now-playing .label').remove();
      $('.now-playing').removeClass('now-playing');
      $(trackEl).addClass('now-playing');
      return $(trackEl).html("<span class=\"label success\">now playing</span> " + ($(trackEl).html()));
    };

    return AlbumSongListView;

  })(Backbone.View);

  module.exports = AlbumSongListView;

}).call(this);
