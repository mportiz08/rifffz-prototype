(function() {
  var Importer, dir, fs, importer;

  Importer = require('../src/importer').Importer;

  fs = require('fs');

  dir = '/Users/marcus/Music/iTunes/iTunes\ Media/Music/O\'Brother/Garden\ Window';

  importer = new Importer();

  importer.importAlbum(dir, function(info) {
    console.log(info);
    return fs.writeFile("" + __dirname + "/folder.jpg", info.album.cover);
  });

}).call(this);
