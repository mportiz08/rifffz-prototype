(function() {
  var loadCover, util;

  util = require('util');

  loadCover = function() {
    var album, artist;
    artist = $('.album-info .artist-name').text();
    album = $('.album-info .album-name').text();
    return $('.album-cover').css({
      'background': "url(\"/api/cover/" + (util.slugify(artist)) + "/" + (util.slugify(album)) + "\") no-repeat center center",
      'background-size': 'contain'
    });
  };

  $(function() {
    return loadCover();
  });

}).call(this);
