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
      if(err) return;
      this.downloadUrls(url);
    })
  })
};

exports.downloadUrls = function(url){
  httpRequest.get({'url':url}, paths.archivedSites + url, function (err,res) {
    console.log("DOWNLOADING URLS", res);
    if(err) throw err;
    fs.appendFile('/workers/log.txt', url, 'utf8', function(err) {
      if(err) throw err;
    });
  });
};


