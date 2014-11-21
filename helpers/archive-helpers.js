var fs = require('fs');
var path = require('path');
var httpHelpers = require('../web/http-helpers')
var _ = require('underscore');
var httpRequest = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback){
  fs.readFile(paths.list, "utf8", function(err,data) {
    if(err) throw err;
    var urlList = data.split("\n");
    callback(urlList);
  });
};

exports.isUrlInList = function(list, requestedUrl){
  return _.contains(list, requestedUrl);
};

exports.addUrlToList = function(response, requestedUrl){
  fs.appendFile(paths.list, requestedUrl+"\n", "utf8", function(err) {
    if(err) throw err;
    console.log("Url was added to file");
    httpHelpers.readFile(response, paths.siteAssets+"/loading.html", 302);
  });

};

exports.isUrlArchived = function(urlList){
  _.each(urlList, function (url) {
    fs.readFile(paths.archivedSites + url, 'utf8' , function (err, data) {
      if(err) {
        downloadUrls(url);
      }
      return;
    })
  })
};

exports.downloadUrls = downloadUrls = function(url){
  requestUrl = "http://"+url;
  console.log("DOWNLOADING URL",url);

  httpRequest.get({url: requestUrl},
    paths.archivedSites +"/"+ url, function (err, res) {
    if (err) {
      console.error(err);
      return;
    }
    fs.appendFile('/Users/HR10/2014-10-web-historian/workers/log.txt', url+"\n", 'utf8', function(err) {
    if(err) throw err;
    console.log(res.code, res.headers, res.file);
    });
  });
};


