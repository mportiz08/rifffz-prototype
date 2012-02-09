(function() {
  var Util, path, _;

  _ = require('underscore');

  path = require('path');

  Util = (function() {

    function Util() {}

    Util.slugify = function(str) {
      return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    };

    Util.onlyMP3s = function(files) {
      return _.filter(files, function(file) {
        return path.extname(file) === '.mp3';
      });
    };

    return Util;

  })();

  module.exports.Util = Util;

}).call(this);
