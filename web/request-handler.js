var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

var actions = {
  GET: function(request, response, requestUrl) {
    httpHelpers.serveAssets(response, requestUrl);
  },
  POST: function(request, response) {

  },
  OPTIONS: function(request, response) {

  }
};


exports.handleRequest = function (request, response) {
  var requestUrl = url.parse(request.url).path;
  actions[request.method](request, response, requestUrl);
  response.end(archive.paths.list);
};
