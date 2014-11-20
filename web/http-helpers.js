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
  console.log("SERVEDASSETS",requestUrl);
  if(requestUrl === "/") {
    return readFile(response, "./web/public/index.html");
  }

  archive.readListOfUrls(function(list) {
    console.log('reading list of urls', list);
    if(archive.isUrlInList(list, requestUrl)) {
      console.log('contains the url');
      readFile(response, "./archives/sites"+requestUrl);
    }
  });

  // We have a site URL
  // Read the sites
    // Find out if it's in the list
    // If it is in the list
      // Read the file
      // SendResponse with the file
    // If it's not in the list
      // Add it to the list
      // Return the loading page



};




// As you progress, keep thinking about what helper functions you can put here!
