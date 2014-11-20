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
    if(err) throw err;
    console.log("READFILEDATA",data);
    sendResponse(response, data, statusCode);
  });
}

exports.serveAssets = serveAssets = function(response, requestedUrl, callback) {
  console.log("SERVEDASSETS",requestedUrl);
  if(requestedUrl === "/") {
    return readFile(response, archive.paths.siteAssets+"/index.html");
  }

  archive.readListOfUrls(function(list) {
    console.log('reading list of urls', list);
    if(archive.isUrlInList(list, requestedUrl.slice(1))) {
      console.log('contains the url',requestedUrl);
      return readFile(response, archive.paths.archivedSites+requestedUrl);
    } else {
      archive.addUrlToList(response, requestedUrl);
      // console.log("FILE NOT FOUND");
      // return sendResponse(response, "File not found", 404);
    }
});

};




