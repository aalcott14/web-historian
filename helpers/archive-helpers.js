var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var path = require('path');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf8', function doneReading(err, content) {
    var listArr = content.split('\n');
    callback(listArr);
  });
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls( (urlList) => {
    (urlList.indexOf(url) > -1) ? callback(true) : callback(false);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, '\n' + url, callback);
  
};

exports.isUrlArchived = function(url, callback) {
  var bool;
  fs.exists(path.join(this.paths.archivedSites, url), (exists) => {
    // if (!exists) {
    //   if (callback) {
    //     callback(false);
    //   } else {
    //     bool = false;
    //   }
    // } else {
    //   if (callback) {
    //     callback(true);
    //   } else {  
    //     bool = true;
    //   }
    // }
    if (callback) {
      callback(exists);
    }
    bool = exists;
  });
  return bool;
};

exports.downloadUrls = function(urls) {
  urls.forEach( (url)=> {
    http.get('http://' + url);
    // , function(response) {
    //   response.pipe(fs.createWriteStream(this.paths.archivedSites + '/' + url));
    // });
  });
};
