(function() {
  var Util;

  Util = (function() {

    function Util() {}

    Util.slugify = function(str) {
      return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    };

    return Util;

  })();

  module.exports = Util;

}).call(this);
