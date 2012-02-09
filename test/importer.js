(function() {
  var Importer, importer, takeCare;

  Importer = require('../src/importer').Importer;

  takeCare = '/Users/marcus/Music/iTunes/iTunes\ Media/Music/Explosions\ in\ the\ Sky/Take\ Care,\ Take\ Care,\ Take\ Care';

  importer = new Importer();

  importer.importAlbum(takeCare, function(album) {
    return console.log(album);
  });

}).call(this);
