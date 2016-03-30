var gulp        = require('gulp-help')(require('gulp'), {hideDepsMessage: true}),
    argv        = require('yargs').argv,
    gulpif      = require('gulp-if'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync').create();

var production = argv.production || false,
    allowlint  = argv.allowlint  || false,
    stagingUrl = argv.stagingUrl || false;

// Override standard gulp.src task to use plumber
var _gulpsrc = gulp.src;
gulp.src = function() {
  return _gulpsrc.apply(gulp, arguments)
    .pipe(gulpif(!production, plumber({
      errorHandler: function(err) {
        notify.onError("Error: " + err.toString())(err);
        this.emit('end');
      }
    })));
};

// Compile SCSS to CSS
require('./gulp/styles')(gulp, production, browserSync);

// Lints scss files
require('./gulp/styles-lint')(gulp, production, allowlint);

// Concatenate & Minify JS
require('./gulp/scripts')(gulp, production, browserSync);

// Lint js files
require('./gulp/scripts-lint')(gulp, production, allowlint);

// Min / Crush images
require('./gulp/images')(gulp, production);

// Minify SVGS + run sprite task
require('./gulp/svgs')(gulp);

// Create SVG sprite file
require('./gulp/svg-sprite')(gulp, production);

// Copy font files from assets to dist
require('./gulp/fonts')(gulp);

// Deletes the build folder entirely.
require('./gulp/clean')(gulp);

// Build the HTML from twig files
require('./gulp/twig')(gulp);

// Watch Files For Changes
require('./gulp/watch')(gulp, browserSync);

// Generic build task. Use with '--production' for production builds
gulp.task('build',
  'Main build task. Runs styles, scripts, images, svgs, fonts and php:lint. Does not delete dist directory.', [
    'images',
    'svgs',
    'styles',
    'scripts',
    'fonts',
  ]
);

gulp.task('default',
  'Runs the build task. Deleting the dist directory first.',
  ['clean'],
  function() {
    gulp.start('build');
  }
);
