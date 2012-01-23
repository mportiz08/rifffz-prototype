(function() {
  var AlbumCoverView, AlbumSongListView, AlbumView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  AlbumCoverView = require('views/album_cover_view');

  AlbumSongListView = require('views/album_song_list_view');

  AlbumView = (function(_super) {

    __extends(AlbumView, _super);

    function AlbumView() {
      AlbumView.__super__.constructor.apply(this, arguments);
    }

    AlbumView.prototype.el = 'div.album-info.span8';

    AlbumView.prototype.initialize = function() {
      this.titleEl = $(this.el).find('h1');
      return this.artistEl = $(this.el).find('h2');
    };

    AlbumView.prototype.render = function() {
      this.titleEl.empty();
      this.artistEl.empty();
      this.titleEl.text(this.model.get('name'));
      this.titleEl.append("<span class=\"album-year-released\">&nbsp;(" + (this.model.get('year')) + ")</span>");
      this.artistEl.text(this.model.get('artist'));
      new AlbumCoverView({
        model: this.model
      }).render();
      new AlbumSongListView({
        model: this.model
      }).render();
      return this;
    };

    return AlbumView;

  })(Backbone.View);

  module.exports = AlbumView;

}).call(this);
