$ ->
  $('#library .media-grid a').mouseenter ->
    artist = $(@).parent().attr 'data-artist'
    album  = $(@).parent().attr 'data-album'
    $(@).append "<div class=\"hover\">#{album}<br /><br /><small>#{artist}</small></div>"
  $('#library .media-grid a').mouseleave ->
    $(@).find('.hover').remove()
