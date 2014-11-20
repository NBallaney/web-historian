var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

var actions = {
  GET: function(request, response, requestedUrl) {
    httpHelpers.serveAssets(response, requestedUrl);
  },
  POST: function(request, response) {
    archive.addUrlToList(response, request._postData.url);
  },
  OPTIONS: function(request, response) {
    resonse.writeHead(200,httpHelpers.headers);
    response.end();
  }
};


exports.handleRequest = function (request, response) {
  var requestedUrl = url.parse(request.url).path;
  console.log("HANDLEDREQUEST",requestedUrl);
  actions[request.method](request, response, requestedUrl);
  response.end(archive.paths.list);
};
