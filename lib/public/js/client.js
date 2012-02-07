
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
}, "util": function(exports, require, module) {(function() {
  var Util;

  Util = (function() {

    function Util() {}

    Util.slugify = function(str) {
      return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    };

    return Util;

  })();

  module.exports = Util;

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

    AlbumCoverView.prototype.setParams = function(params) {
      this.params = params;
      return this;
    };

    AlbumCoverView.prototype.render = function() {
      $(this.el).empty();
      $("<div class=\"album-cover\"></div>").appendTo($(this.el)).css({
        'background': "url(\"/api/cover/" + this.params.artist + "/" + this.params.album + "\") no-repeat center center",
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
      var trackName, trackNo;
      trackName = $(e.target).text();
      trackNo = $(e.target).parent().prevAll().length;
      window.controls.changeTrack(trackNo);
      return false;
    };

    AlbumSongListView.prototype.updateNowPlaying = function(e, trackNo) {
      var trackEl;
      console.log('update called');
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
      this.dateEl = $(this.el).find('small');
      return this.artistEl = $(this.el).find('h2');
    };

    AlbumView.prototype.setParams = function(params) {
      this.params = params;
      return this;
    };

    AlbumView.prototype.render = function() {
      this.titleEl.empty();
      this.dateEl.empty();
      this.artistEl.empty();
      this.titleEl.text(this.model.get('name'));
      this.dateEl.text("" + (this.model.get('year')));
      this.artistEl.text(this.model.get('artist'));
      new AlbumCoverView({
        model: this.model
      }).setParams(this.params).render();
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
  var ControlsView, util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  util = require('util');

  ControlsView = (function(_super) {

    __extends(ControlsView, _super);

    function ControlsView() {
      this.updateProgress = __bind(this.updateProgress, this);
      this.initDuration = __bind(this.initDuration, this);
      ControlsView.__super__.constructor.apply(this, arguments);
    }

    ControlsView.prototype.el = 'div.top-bar div.container div.row';

    ControlsView.prototype.events = {
      'click .play-pause': 'togglePlay'
    };

    ControlsView.prototype.initialize = function() {
      this.changeTrack(0);
      this.playPauseEl = $(this.el).find('.play-pause');
      this.progressEl = $(this.el).find('.progress-bar span');
      this.timePassedEl = $(this.el).find('.time-passed');
      this.timeTotalEl = $(this.el).find('.time-total');
      this.audio = $('audio').get(0);
      $(this.audio).bind('canplay', this.initDuration);
      return $(this.audio).bind('timeupdate', this.updateProgress);
    };

    ControlsView.prototype.initDuration = function() {
      var duration, durationMins, durationSecs, padding;
      duration = parseInt(this.audio.duration, 10);
      durationMins = Math.floor(duration / 60, 10);
      durationSecs = duration - (durationMins * 60);
      padding = '';
      if (durationSecs < 10) padding = '0';
      return this.timeTotalEl.text(durationMins + ':' + padding + durationSecs);
    };

    ControlsView.prototype.updateProgress = function() {
      this.updateProgressBar();
      return this.updateTimePassed();
    };

    ControlsView.prototype.updateProgressBar = function() {
      var percentage;
      percentage = (this.audio.currentTime / this.audio.duration) * 100;
      return this.progressEl.css({
        width: percentage + '%'
      });
    };

    ControlsView.prototype.updateTimePassed = function() {
      var padding, timePassed, timePassedMins, timePassedSecs;
      timePassed = parseInt(this.audio.currentTime, 10);
      timePassedMins = Math.floor(timePassed / 60, 10);
      timePassedSecs = timePassed - (timePassedMins * 60);
      padding = '';
      if (timePassedSecs < 10) padding = '0';
      return this.timePassedEl.text(timePassedMins + ':' + padding + timePassedSecs);
    };

    ControlsView.prototype.togglePlay = function() {
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

    ControlsView.prototype.changeTrack = function(trackNo) {
      $('audio').attr('src', "/api/audio/" + (util.slugify(this.model.get('artist'))) + "/" + (util.slugify(this.model.get('name'))) + "/" + (util.slugify(this.model.get('songs')[trackNo])));
      return $('ul.album-song-list.unstyled').trigger('updateNowPlaying', [trackNo]);
    };

    return ControlsView;

  })(Backbone.View);

  module.exports = ControlsView;

}).call(this);
}});
