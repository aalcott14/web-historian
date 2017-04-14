var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('Archive sites', archive.paths.archivedSites);
  console.log('[' + req.url + ']');
  console.log('url no slash: [' + req.url + ']');
  console.log('Is url archived, ' + archive.isUrlArchived(req.url));
  if (req.url === '/' || req.url === '') {
    fs.readFile(path.join(__dirname, '/public/index.html'), 'utf8', function(err, html) {
      if (err) { 
        console.log('Error: ', err);
      }
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.end(html);
    });

    archive.readListOfUrls((data)=> { 
    });
  } else if (archive.isUrlArchived(req.url.substr(1)), (exists)=> exists) {
    console.log('Handle archived url');
    fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, html) {
      if (err) { 
        console.log('Error serving archived site: ', err);
      }
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.end(html);
    });
  } else {
    res.writeHeader(404);
    res.end();
  }
};
