class AlbumCoverView extends Backbone.View
  el: 'div.album-cover-view.span8'
  
  setParams: (params) ->
    @params = params
    @
  
  render: ->
    $(@el).empty()
    $("<div class=\"album-cover\"></div>").appendTo($(@el))
      .css('background': "url(\"/api/cover/#{@params.artist}/#{@params.album}\") no-repeat center center", 'background-size': 'contain')
      .append("<div class=\"album-cover-overlay\"></div>")
    @

module.exports = AlbumCoverView
