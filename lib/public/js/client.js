
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"init": function(exports, require, module) {(function() {
  var Router;

  Router = require('routers/router');

  $(function() {
    window.router = new Router();
    return Backbone.history.start();
  });

}).call(this);
}, "models/album": function(exports, require, module) {(function() {
  var Album,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Album = (function(_super) {

    __extends(Album, _super);

    function Album() {
      Album.__super__.constructor.apply(this, arguments);
    }

    return Album;

  })(Backbone.Model);

  module.exports = Album;

}).call(this);
}, "routers/router": function(exports, require, module) {(function() {
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
        });
        albumView.render();
        controlsView = new ControlsView();
        return controlsView.render();
      });
    };

    return Router;

  })(Backbone.Router);

  module.exports = Router;

}).call(this);
}, "views/album_cover_view": function(exports, require, module) {(function() {
  var AlbumCoverView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  AlbumCoverView = (function(_super) {

    __extends(AlbumCoverView, _super);

    function AlbumCoverView() {
      AlbumCoverView.__super__.constructor.apply(this, arguments);
    }

    AlbumCoverView.prototype.el = 'div.album-cover-view.span8';

    AlbumCoverView.prototype.render = function() {
      $(this.el).empty();
      $("<div class=\"album-cover\"></div>").appendTo($(this.el)).css({
        'background': 'url("/api/cover/testartist/testalbum") no-repeat center center',
        'background-size': 'contain'
      }).append("<div class=\"album-cover-overlay\"></div>");
      return this;
    };

    return AlbumCoverView;

  })(Backbone.View);

  module.exports = AlbumCoverView;

}).call(this);
}, "views/album_song_list_view": function(exports, require, module) {(function() {
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
      return this;
    };

    return AlbumSongListView;

  })(Backbone.View);

  module.exports = AlbumSongListView;

}).call(this);
}, "views/album_view": function(exports, require, module) {(function() {
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
}, "views/controls_view": function(exports, require, module) {(function() {
  var ControlsView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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

  module.exports = ControlsView;

}).call(this);
}});
