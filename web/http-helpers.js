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
  statusCode = statusCode || 200;
  console.log("SENT RESPONSE",html);
  response.writeHead(statusCode, headers);
  response.end(html);
};

exports.readFile = readFile = function(response, requestedUrl, statusCode) {
  console.log("READFILE",requestedUrl);
  fs.readFile(requestedUrl, "utf8", function(err, data) {
    if(err) {
      sendResponse(response, "FILE NOT FOUND", 404);
    }
    console.log("READFILEDATA",data);
    sendResponse(response, data, statusCode);
  });
}

exports.handlePost = handlePost = function(response, requestedUrl, callback) {
  console.log("SERVEDASSETS",requestedUrl);

  archive.readListOfUrls(function(list) {
    console.log('reading list of urls', list);
    if(archive.isUrlInList(list, requestedUrl)) {
      console.log('contains the url',requestedUrl);
      return readFile(response, archive.paths.archivedSites+"/"+requestedUrl);
    } else {
      archive.addUrlToList(response, requestedUrl);
    }
  });
}

exports.handleGet = handleGet = function(response, requestedUrl) {
  if(requestedUrl === "/") {
      return readFile(response, archive.paths.siteAssets+"/index.html");
  }

  if(requestedUrl.substring(1,4) === "www") {
     return readFile(response, archive.paths.archivedSites+requestedUrl);
  }

  return readFile(response, archive.paths.siteAssets+requestedUrl);
};



// We have a get request
  // If the url is "/", serve up index.html
  // If the file exists
    // Serve up that file
  // Else
    // Return a 404

// We have a post request
  // See if the URL is in the list
  // If it is
    // Serve the cached version
  // If it's not
    // Then add it to the list
    // Serve the loading page




