var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

var actions = {
  GET: function(request, response, requestedUrl) {
    httpHelpers.handleGet(response, requestedUrl);
  },
  POST: function(request, response) {
    var postData = "";
    request.on("data", function(data) {
      postData += data;
    });
    request.on("end", function() {
      console.log('POSTDATA',postData.split("=")[1]);
      httpHelpers.handlePost(response, postData.split("=")[1]);
    });
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
};
