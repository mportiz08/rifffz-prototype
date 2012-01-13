(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var Album, AlbumSongListView, Router;
    Album = (function(_super) {

      __extends(Album, _super);

      function Album() {
        Album.__super__.constructor.apply(this, arguments);
      }

      return Album;

    })(Backbone.Model);
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
          console.log("rendering song " + s);
          return $(_this.el).append("<li>" + s + "</li>");
        });
        return this;
      };

      return AlbumSongListView;

    })(Backbone.View);
    Router = (function(_super) {

      __extends(Router, _super);

      function Router() {
        Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.routes = {
        ":artist/:album": "album"
      };

      Router.prototype.album = function(artistName, albumName) {
        console.log('album route called with: ' + artistName + ', ' + albumName);
        return $.get("/api/album/" + artistName + "/" + albumName, function(data, textStatus, jqXHR) {
          var album, songList;
          album = new Album({
            songs: data.album.songs
          });
          songList = new AlbumSongListView({
            model: album
          });
          return songList.render();
        });
      };

      return Router;

    })(Backbone.Router);
    window.router = new Router;
    return Backbone.history.start();
  });

}).call(this);
