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

exports.readFile = readFile = function(response, requestedUrl, statusCode) {
  console.log("READFILE",requestedUrl);
  fs.readFile(requestedUrl, "utf8", function(err, data) {
    if(err) throw err;
    sendResponse(response, data, statusCode);
  });
}

exports.serveAssets = serveAssets = function(response, requestedUrl, callback) {
  console.log("SERVEDASSETS",requestedUrl);
  if(requestedUrl === "/") {
    return readFile(response, "./web/public/index.html");
  }

  archive.readListOfUrls(function(list) {
    console.log('reading list of urls', list);
    if(archive.isUrlInList(list, requestedUrl.slice(1))) {
      console.log('contains the url');
      return readFile(response, "./archives/sites"+requestedUrl);
    } else {
      return archive.addUrlToList(response, requestedUrl);
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
