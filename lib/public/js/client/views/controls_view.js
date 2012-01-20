(function() {
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
