(function() {
  var Album,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Album = (function(_super) {

    __extends(Album, _super);

    function Album() {
      Album.__super__.constructor.apply(this, arguments);
    }

    return Album;

  })(Backbone.Model);

  module.exports = Album;

}).call(this);
