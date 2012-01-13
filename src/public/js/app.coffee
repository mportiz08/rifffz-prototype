$ ->
  class window.Router extends Backbone.Router
    routes:
      "album/:artist/:album": "album"
    
    album: (artist, album) ->
      console.log artist + ', ' + album
  
  class window.AppView extends Backbone.View
    el: $('#main.container')
  
  window.app = new AppView
  window.router = new Router
  Backbone.history.start()
