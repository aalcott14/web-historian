var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile(path.join(__dirname, '/public/index.html'), 'utf8', function(err, html) {
    if (err) { 
      console.log('Error: ', err);
    }
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.end(html);
  });
  archive.readListOfUrls((data)=> { 
    console.log(data);
  });
};
