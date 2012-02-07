(function() {
  var Album, AlbumView, ControlsView, Router,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Album = require('models/album');

  AlbumView = require('views/album_view');

  ControlsView = require('views/controls_view');

  Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      ":artist/:album": "album"
    };

    Router.prototype.album = function(artistName, albumName) {
      return $.get("/api/album/" + artistName + "/" + albumName, function(data, textStatus, jqXHR) {
        var album, albumView, controlsView;
        album = new Album({
          name: data.album.name,
          year: data.album.year,
          artist: data.artist.name,
          songs: data.album.songs
        });
        albumView = new AlbumView({
          model: album
        }).setParams({
          artist: artistName,
          album: albumName
        });
        albumView.render();
        controlsView = new ControlsView({
          model: album
        });
        window.controls = controlsView;
        return controlsView.render();
      });
    };

    return Router;

  })(Backbone.Router);

  module.exports = Router;

}).call(this);
