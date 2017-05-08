function sleep(milliSec){
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + milliSec);
}

function start(){
    console.log("request 'start' is handled");
    sleep(10000);
    return "hello start!";
}
function upload(){
    console.log("request 'upload' is handled");
    return "hello upload!";
}

exports.start = start;
exports.upload = upload;
