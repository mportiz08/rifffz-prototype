(function() {
  var Controls, util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  util = require('util');

  Controls = (function() {

    function Controls(artist, album, songs) {
      this.artist = artist;
      this.album = album;
      this.songs = songs;
      this.nextTrack = __bind(this.nextTrack, this);
      this.prevTrack = __bind(this.prevTrack, this);
      this.clickTrack = __bind(this.clickTrack, this);
      this.togglePlay = __bind(this.togglePlay, this);
      this.updateProgress = __bind(this.updateProgress, this);
      this.initDuration = __bind(this.initDuration, this);
      this.playPauseEl = $('.play-pause');
      this.prevTrackEl = $('.prev-track');
      this.nextTrackEl = $('.next-track');
      this.progressEl = $('.progress-bar span');
      this.timePassedEl = $('.time-passed');
      this.timeTotalEl = $('.time-total');
      this.songListEl = $('.album-song-list');
      this.audio = $('audio').get(0);
      $(this.audio).bind('canplay', this.initDuration);
      $(this.audio).bind('timeupdate', this.updateProgress);
      this.playPauseEl.click(this.togglePlay);
      this.prevTrackEl.click(this.prevTrack);
      this.nextTrackEl.click(this.nextTrack);
      this.songListEl.on('click', 'li a', this.clickTrack);
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

    Controls.prototype.clickTrack = function(event) {
      var trackNo;
      trackNo = $(event.target).parent().prevAll().length;
      this.changeTrack(trackNo);
      return false;
    };

    Controls.prototype.prevTrack = function(event) {
      var trackNo;
      trackNo = $('.now-playing').prevAll().length - 1;
      if (!(trackNo < 0)) this.changeTrack(trackNo);
      return false;
    };

    Controls.prototype.nextTrack = function(event) {
      var trackNo;
      trackNo = $('.now-playing').prevAll().length + 1;
      if (!(trackNo > (this.songs.length - 1))) this.changeTrack(trackNo);
      return false;
    };

    Controls.prototype.changeTrack = function(trackNo) {
      this.updateNowPlaying(trackNo);
      $('audio').attr('src', "/api/audio/" + (util.slugify(this.artist)) + "/" + (util.slugify(this.album)) + "/" + (util.slugify(this.songs[trackNo])));
      this.togglePlay();
      return this.updateProgress();
    };

    Controls.prototype.updateNowPlaying = function(trackNo) {
      var trackEl;
      trackEl = this.songListEl.find('li').eq(trackNo);
      $('.now-playing .label').remove();
      $('.now-playing').removeClass('now-playing');
      $(trackEl).addClass('now-playing');
      return $(trackEl).html("<span class=\"label success\">now playing</span> " + (trackEl.html()));
    };

    return Controls;

  })();

  module.exports = Controls;

}).call(this);
