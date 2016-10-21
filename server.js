var bs = require('browser-sync').create();

bs.init({
    server: "./",
    files: ["./**/*.css","./**/*.html","./js_build/__*.js"]
});