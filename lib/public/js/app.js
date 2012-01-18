(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var Album, AlbumSongListView, AlbumView, ControlsView, Router;
    Album = (function(_super) {

      __extends(Album, _super);

      function Album() {
        Album.__super__.constructor.apply(this, arguments);
      }

      return Album;

    })(Backbone.Model);
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
        new AlbumSongListView({
          model: this.model
        }).render();
        return this;
      };

      return AlbumView;

    })(Backbone.View);
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
        return this;
      };

      return AlbumSongListView;

    })(Backbone.View);
    ControlsView = (function(_super) {

      __extends(ControlsView, _super);

      function ControlsView() {
        ControlsView.__super__.constructor.apply(this, arguments);
      }

      ControlsView.prototype.el = 'div.top-bar div.container div.row';

      ControlsView.prototype.events = {
        'click .play-pause': 'togglePlay'
      };

      ControlsView.prototype.initialize = function() {
        this.playPauseEl = $(this.el).find('.play-pause');
        return this.audio = $('audio').get(0);
      };

      ControlsView.prototype.togglePlay = function() {
        console.log('toggling');
        if (this.audio.paused) {
          this.audio.play();
          this.setPauseIcon();
        } else {
          this.audio.pause();
          this.setPlayIcon();
        }
        return false;
      };

      ControlsView.prototype.setPauseIcon = function() {
        this.playPauseEl.removeClass('sprite-icons-Play');
        return this.playPauseEl.addClass('sprite-icons-Pause');
      };

      ControlsView.prototype.setPlayIcon = function() {
        this.playPauseEl.removeClass('sprite-icons-Pause');
        return this.playPauseEl.addClass('sprite-icons-Play');
      };

      return ControlsView;

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
          });
          albumView.render();
          controlsView = new ControlsView();
          return controlsView.render();
        });
      };

      return Router;

    })(Backbone.Router);
    window.router = new Router;
    return Backbone.history.start();
  });

}).call(this);
