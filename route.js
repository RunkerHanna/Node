function route(handle, pathname){
    console.log("about to route a request for " + pathname);
    if(typeof handle[pathname] == 'function'){
         return handle[pathname]();
    }else{
        console.log("no handler for this request" + pathname);
        return "404 not found!";
    }
}
exports.route = route;