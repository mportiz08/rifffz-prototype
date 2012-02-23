(function() {
  var Controls, util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  util = require('util');

  Controls = (function() {

    function Controls(artist, album, songs) {
      var el;
      this.artist = artist;
      this.album = album;
      this.songs = songs;
      this.togglePlay = __bind(this.togglePlay, this);
      this.updateProgress = __bind(this.updateProgress, this);
      this.initDuration = __bind(this.initDuration, this);
      el = '.top-bar .row';
      this.playPauseEl = $(el).find('.play-pause');
      this.progressEl = $(el).find('.progress-bar span');
      this.timePassedEl = $(el).find('.time-passed');
      this.timeTotalEl = $(el).find('.time-total');
      this.audio = $('audio').get(0);
      $(this.audio).bind('canplay', this.initDuration);
      $(this.audio).bind('timeupdate', this.updateProgress);
      this.playPauseEl.bind('click', this.togglePlay);
      this.changeTrack(0);
      this.togglePlay();
    }

    Controls.prototype.initDuration = function() {
      var duration, durationMins, durationSecs, padding;
      duration = parseInt(this.audio.duration, 10);
      durationMins = Math.floor(duration / 60, 10);
      durationSecs = duration - (durationMins * 60);
      padding = '';
      if (durationSecs < 10) padding = '0';
      return this.timeTotalEl.text(durationMins + ':' + padding + durationSecs);
    };

    Controls.prototype.updateProgress = function() {
      this.updateProgressBar();
      return this.updateTimePassed();
    };

    Controls.prototype.updateProgressBar = function() {
      var percentage;
      percentage = (this.audio.currentTime / this.audio.duration) * 100;
      return this.progressEl.css({
        width: percentage + '%'
      });
    };

    Controls.prototype.updateTimePassed = function() {
      var padding, timePassed, timePassedMins, timePassedSecs;
      timePassed = parseInt(this.audio.currentTime, 10);
      timePassedMins = Math.floor(timePassed / 60, 10);
      timePassedSecs = timePassed - (timePassedMins * 60);
      padding = '';
      if (timePassedSecs < 10) padding = '0';
      return this.timePassedEl.text(timePassedMins + ':' + padding + timePassedSecs);
    };

    Controls.prototype.togglePlay = function() {
      if (this.audio.paused) {
        this.audio.play();
        this.setPauseIcon();
      } else {
        this.audio.pause();
        this.setPlayIcon();
      }
      return false;
    };

    Controls.prototype.setPauseIcon = function() {
      this.playPauseEl.removeClass('sprite-icons-Play');
      return this.playPauseEl.addClass('sprite-icons-Pause');
    };

    Controls.prototype.setPlayIcon = function() {
      this.playPauseEl.removeClass('sprite-icons-Pause');
      return this.playPauseEl.addClass('sprite-icons-Play');
    };

    Controls.prototype.changeTrack = function(trackNo) {
      $('audio').attr('src', "/api/audio/" + (util.slugify(this.artist)) + "/" + (util.slugify(this.album)) + "/" + (util.slugify(this.songs[trackNo])));
      $('ul.album-song-list.unstyled').trigger('updateNowPlaying', [trackNo]);
      this.togglePlay();
      return this.updateProgress();
    };

    return Controls;

  })();

  module.exports = Controls;

}).call(this);
