(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    window.Router = (function(_super) {

      __extends(Router, _super);

      function Router() {
        Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.routes = {
        "album/:artist/:album": "album"
      };

      Router.prototype.album = function(artist, album) {
        return console.log(artist + ', ' + album);
      };

      return Router;

    })(Backbone.Router);
    window.AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = $('#main.container');

      return AppView;

    })(Backbone.View);
    window.app = new AppView;
    window.router = new Router;
    return Backbone.history.start();
  });

}).call(this);
