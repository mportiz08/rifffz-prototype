(function() {
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
