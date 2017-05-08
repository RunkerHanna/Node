var querystring = require("querystring");
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

/*
function sleep(milliSec){
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + milliSec);
}
*/

//var exec = require("child_process").exec;
function start(request, response){
    console.log("request 'start' is handled");
    /*
    exec('dir', {timeout: 10000, maxBuffer: 20000*1024}, function(error, stdout, stderr){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    })
    */

    var body = '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(request, response){
    console.log("request 'upload' is handled");

    var form = new formidable.IncomingForm();
    form.uploadDir = 'C:/Users/Jomaker/Pictures/temp/';

    console.log('-----about to parse------');
    
    form.parse(request, function(error, fields, files){
        console.log("-----parse done-----");
       // console.log(files.upload.size);
        //rename the file object(exactly in local temp)
        if(!error){
        fs.renameSync(files.upload.path, "C:/Users/Jomaker/Pictures/test.png");

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image: <br>");
        response.write("<img src='/show' />");     
        response.write('<br>received upload:<br>');
        response.end(util.inspect({fields: fields, files: files}));  
        }else{
            console.log(error);
        }
    })
    
}

function show(request, response){
    console.log("resuest handler 'show' was called");
    fs.readFile('C:/Users/Jomaker/Pictures/test.png', "binary", function(error, file){
        if(error){
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}
exports.start = start;
exports.upload = upload;
exports.show = show;