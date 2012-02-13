_    = require 'underscore'
path = require 'path'

class Util
  @slugify: (str) ->
    str.toLowerCase()
       .replace(/\s+/g, '-')     # Replace spaces with -
       .replace(/[^\w\-]+/g, '') # Remove all non-word chars
       .replace(/\-\-+/g, '-')   # Replace multiple - with single -
       .replace(/^-+/, '')       # Trim - from start of text
       .replace(/-+$/, '')       # Trim - from end of text
  
  @onlyMP3s: (files) ->
    _.filter files, (file) ->
      path.extname(file) == '.mp3'

module.exports.Util = Util
