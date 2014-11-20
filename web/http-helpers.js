var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = sendResponse = function(response, html, statusCode) {
  console.log("SENT RESPONSE",statusCode);
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(html);
};

exports.readFile = readFile = function(response, requestUrl) {
  console.log("READFILE",requestUrl);
  fs.readFile(requestUrl, "utf8", function(err, data) {
    if(err) throw err;
    sendResponse(response, data);
  });
}

exports.serveAssets = serveAssets = function(response, requestUrl, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  console.log("SERVEDASSETS",requestUrl);
  if(requestUrl === "/") {
    readFile(response, "./web/public/index.html");
  }
};




// As you progress, keep thinking about what helper functions you can put here!
