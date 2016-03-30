var manifest = require('../src/manifest.json'),
    merge    = require('merge-stream'),
    fs       = require('fs'),
    gulpif   = require('gulp-if'),
    notify   = require('gulp-notify'),
    twig     = require('gulp-twig'),
    data     = require('gulp-data'),
    merge    = require('merge'),
    path     = require('path'),
    debug = require('gulp-debug');

// Compile SCSS to CSS
module.exports = function (gulp, production, browserSync) {
  'use strict';
  var paths = manifest.paths;
  gulp.task(
    'twig',
    'Compile swig files to HTML.',
    function() {

      var json = manifest.json.map(
        function(file) {
          return paths.lang + file
        }
      );

      console.log(json);

      var parsed;

      json.forEach(function(file) {
        var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
        parsed = merge(parsed, obj);
      });

      console.log('Finished Loop');
      console.log(parsed);

     gulp.src('src/twig/*.twig')
        .pipe(data(parsed))
        .pipe(debug())
        .pipe(twig({
          debug: false,
          trace: false,
          errorLogToConsole: true
        }))
        .on('error', console.error)
        .pipe(gulp.dest('dist'));
    }, {
      options: {
        'production': 'Minified without sourcemaps.'
      }
    }
  );
};
