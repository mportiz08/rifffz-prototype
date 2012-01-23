(function() {
  var AlbumCoverView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  AlbumCoverView = (function(_super) {

    __extends(AlbumCoverView, _super);

    function AlbumCoverView() {
      AlbumCoverView.__super__.constructor.apply(this, arguments);
    }

    AlbumCoverView.prototype.el = 'div.album-cover-view.span8';

    AlbumCoverView.prototype.render = function() {
      $(this.el).empty();
      $("<div class=\"album-cover\"></div>").appendTo($(this.el)).css({
        'background': 'url("/api/cover/testartist/testalbum") no-repeat center center',
        'background-size': 'contain'
      }).append("<div class=\"album-cover-overlay\"></div>");
      return this;
    };

    return AlbumCoverView;

  })(Backbone.View);

  module.exports = AlbumCoverView;

}).call(this);
