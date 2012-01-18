express = require 'express'

app = express.createServer()
app.set 'view engine', 'jade'
app.set 'views', "#{__dirname}/views"
app.use express.static "#{__dirname}/public"

app.get '/', (req, res) ->
  res.render 'index'

app.get '/api/audio/:artist/:album/:song', (req, res) ->
  res.sendfile '/Users/marcus/Music/iTunes/iTunes\ Media/Music/As\ Cities\ Burn/Son,\ I\ Loved\ You\ At\ Your\ Darkest/05\ -\ Terrible\!\ How\ Terrible\ For\ The\ Great\ City\!.mp3'

app.get '/api/album/:artist/:album', (req, res) ->
  res.send
    artist:
      name: 'As Cities Burn'
    album:
      name: 'Son, I Loved You At Your Darkest'
      songs: [
        'Thus From My Lips, By Yours, My Sin Is Purged',
        'Love Jealous One, Love',
        'Incomplete Is a Leech',
        'Bloodsucker Pt. II',
        'Terrible! How Terrible for the Great City!',
        'The Widow',
        'Wake Dead Man, Wake',
        'Admission:Regret',
        'One:Twentyseven',
        'Of Want and Misery:The Nothing That Kills'
      ]

exports.loadApp = ->
  app
