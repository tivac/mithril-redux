"use strict";

var build = require("browserify")();

build.add("./client.js");

build.bundle(function(err, buf) {
    if(err) {
        throw new Error(err);
    }
    
    require("fs").writeFileSync("./output/scripts.js", buf);
});
