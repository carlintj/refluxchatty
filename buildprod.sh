NODE_ENV=production browserify -t [ babelify reactify ] -g uglifyify --full-path=false  src/app.js > build/app.js