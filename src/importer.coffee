_    = require 'underscore'
fs   = require 'fs'
ID3  = require 'id3'
path = require 'path'
util = require('./util').Util

class Importer  
  importAlbum: (dir, callback) ->
    fs.readdir dir, (err, files) =>
      mp3s = (path.join(dir, mp3) for mp3 in util.onlyMP3s(files))
      @getAlbumInfo mp3s[0], (info) =>
        info.album.songs = @getSongs mp3s
        callback info
  
  getAlbumInfo: (file, callback) ->
    fs.readFile file, (err, data) ->
      id3 = new ID3 data
      id3.parse()
      callback
        artist:
          name:  id3.get 'artist'
        album:
          name:  id3.get 'album'
          year:  id3.get 'year'
          cover: id3.get('picture').data.toString('binary')
  
  getSongs: (files) ->
    _.map files, (file) ->
      song = {}
      id3 = new ID3(fs.readFileSync file) # TODO: make this async eventually...
      id3.parse()
      song.name = id3.get 'title'
      song.path = file
      song

exports.Importer = Importer
