var manifest = require('../src/manifest.json'),
    jsonlint = require('gulp-jsonlint');

// Lint Json files
module.exports = function (gulp) {
  'use strict';
  var paths = manifest.paths;
  gulp.task(
    'json:lint',
    'Lint JSON files.',
    ['json:lint'],
    function() {
      gulp.src(paths.lang + "*.json")
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
    }
  );
};
