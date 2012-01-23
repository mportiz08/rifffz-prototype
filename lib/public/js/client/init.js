(function() {
  var Router;

  Router = require('routers/router');

  $(function() {
    window.router = new Router();
    return Backbone.history.start();
  });

}).call(this);
