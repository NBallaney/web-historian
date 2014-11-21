var archive = require('../archives/archive-helpers.js');
var fs = require('fs');
var httpRequest = require('http-request');

archive.readListOfUrls(archive.isUrlArchived);


// Read the list of urls
// For each url
  // Check if the file exists
  // If it does exist
    // Do nothing
  // If it doesn't exist
    // Fetch the html and write it to a new file
