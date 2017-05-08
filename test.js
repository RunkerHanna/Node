function exec(somefunc, word){
    somefunc(word);
}

exec(function(word){
    console.log(word);
}, 'hahais here!');
