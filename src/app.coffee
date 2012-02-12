express = require 'express'
lib     = require('./library').loadLibrary()
stitch  = require 'stitch'

client = stitch.createPackage
  paths: [__dirname + '/public/js/client']

app = express.createServer()
app.set 'view engine', 'jade'
app.set 'views', "#{__dirname}/views"
app.use express.static "#{__dirname}/public"

app.get '/js/client.js', client.createServer()

app.get '/', (req, res) ->
  res.render 'index'

app.get '/api/audio/:artist/:album/:song', (req, res) ->
  lib.getSongAudio req.params.artist, req.params.album, req.params.song, (audio) ->
    res.sendfile audio

app.get '/api/cover/:artist/:album', (req, res) ->
  lib.getAlbumCover req.params.artist, req.params.album, (cover) ->
    res.send new Buffer(cover, 'binary')

app.get '/api/album/:artist/:album', (req, res) ->
  lib.getAlbum req.params.artist, req.params.album, (album) ->
    res.send album

exports.loadApp = (port) ->
  lib.on 'loaded', ->
    console.log "library loaded ✓"
    app.listen port
    console.log "rifffz running ✓"
    console.log "\ncheck it out in your browser at http://127.0.0.1:#{port}"

exports.resetLibrary = ->
  lib.on 'loaded', ->
    lib.reset ->
      lib.close()
      console.log 'library reset ✓'
