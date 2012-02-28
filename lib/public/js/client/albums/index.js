(function() {

  $(function() {
    $('#library .media-grid a').mouseenter(function() {
      var album, artist;
      artist = $(this).parent().attr('data-artist');
      album = $(this).parent().attr('data-album');
      return $(this).append("<div class=\"hover\">" + album + "<br /><br /><small>" + artist + "</small></div>");
    });
    return $('#library .media-grid a').mouseleave(function() {
      return $(this).find('.hover').remove();
    });
  });

}).call(this);
