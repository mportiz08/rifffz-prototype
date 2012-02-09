{Importer} = require '../src/importer'
fs = require 'fs'

dir = '/Users/marcus/Music/iTunes/iTunes\ Media/Music/O\'Brother/Garden\ Window'
importer = new Importer()
importer.importAlbum dir, (info) ->
  console.log info
  fs.writeFile "#{__dirname}/folder.jpg", info.album.cover
