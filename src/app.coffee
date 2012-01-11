express = require 'express'

app = express.createServer()
app.get '/', (req, res) ->
  res.send 'hello, world'
app.get '/test', (req, res) ->
  res.sendfile '/Users/marcus/Music/iTunes/iTunes\ Media/Music/The\ White\ Stripes/White\ Blood\ Cells/The\ White\ Stripes\ -\ Expecting.mp3'

exports.loadApp = ->
  app
