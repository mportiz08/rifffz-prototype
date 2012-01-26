(function() {
  var loadApp, loadLibrary;

  loadApp = require('./app').loadApp;

  loadLibrary = require('./library').loadLibrary;

  module.exports.loadApp = loadApp;

  module.exports.loadLibrary = loadLibrary;

}).call(this);
