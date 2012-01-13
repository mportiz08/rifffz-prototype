(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var Album, Router;
    Album = (function(_super) {

      __extends(Album, _super);

      function Album() {
        Album.__super__.constructor.apply(this, arguments);
      }

      Album.prototype.initialize = function() {};

      return Album;

    })(Backbone.Model);
    Router = (function(_super) {

      __extends(Router, _super);

      function Router() {
        Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.routes = {
        "album/:artist/:album": "album"
      };

      Router.prototype.album = function(artistName, albumName) {
        console.log('album route called with: ' + artistName + ', ' + albumName);
        return $.get("/api/album/" + artistName + "/" + albumName, function(data, textStatus, jqXHR) {
          var album;
          album = new Album({
            songs: data.album.songs
          });
          return console.log(album);
        });
      };

      return Router;

    })(Backbone.Router);
    window.router = new Router;
    return Backbone.history.start();
  });

}).call(this);
