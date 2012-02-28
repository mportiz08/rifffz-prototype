(function() {
  var Controls, initControls, loadCover, util;

  util = require('util');

  Controls = require('albums/controls');

  loadCover = function() {
    var album, artist;
    artist = $('.album-info .artist-name').text();
    album = $('.album-info .album-name').text();
    return $('.album-cover').css({
      'background': "url(\"/api/cover/" + (util.slugify(artist)) + "/" + (util.slugify(album)) + "\") no-repeat center center",
      'background-size': 'contain'
    });
  };

  initControls = function() {
    var album, artist, controls, songs;
    artist = $('.album-info .artist-name').text();
    album = $('.album-info .album-name').text();
    songs = _.map($('.album-song-list a'), function(s) {
      return $(s).text();
    });
    return controls = new Controls(artist, album, songs);
  };

  $(function() {
    loadCover();
    return initControls();
  });

}).call(this);
