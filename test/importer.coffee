{Importer} = require '../src/importer'

takeCare = '/Users/marcus/Music/iTunes/iTunes\ Media/Music/Explosions\ in\ the\ Sky/Take\ Care,\ Take\ Care,\ Take\ Care'
importer = new Importer()
importer.importAlbum takeCare, (album) ->
  console.log album
