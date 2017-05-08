var formidable = require('formidable');
var http = require('http');
var util = require('util');
var fs = require('fs');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = 'C:/Users/Jomaker/Pictures/temp';//手动设置默认上传tmp目录，可以通过fs.rename更改
    form.parse(req, function(err, fields, files) {
      fs.renameSync(files.upload.path, "C:/Users/Jomaker/Pictures/test.png");
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);