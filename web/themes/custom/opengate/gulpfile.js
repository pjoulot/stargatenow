'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat-multi');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var normalize = require('node-normalize-scss').includePaths;
var fs = require("fs");
var runSequence = require('run-sequence');
var config = {};
var running = {
  cache: false
};
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now() / 1000);
var fontName = 'Culturebrew';

/**
 * This task generates CSS from all SCSS files and compresses them down.
 */
gulp.task('sass', function () {
  return gulp.src([
    './node_modules/bootstrap/scss/bootstrap.scss',
    './templates/global/**/*.scss',
    './templates/components/**/*.scss',
    './templates/layouts/**/*.scss',
  ])
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      noCache: true,
      outputStyle: "compressed",
      lineNumbers: false,
      loadPath: './css/*',
      sourceMap: true,
      includePaths: [
        bourbon,
        neat,
        normalize,
        'node_modules/breakpoint-sass/stylesheets/',
      ]
    })).on('error', function (error) {
      gutil.log(error);
      this.emit('end');
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'));
});

/**
 * This task minifies javascript in the js/js-src folder and places them in the js directory.
 */
gulp.task('js', function () {
  concat({
    'global.js': 'templates/global/**/*.js',
    'components.js': 'templates/components/**/*.js',
    'layouts.js': 'templates/layouts/**/*.js',
  })
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js'));
});

/**
 * This task will create a font from our icons.
 */
gulp.task('iconfont', function () {
  return gulp.src(['icons/*.svg']) // Source folder containing the SVG images
    .pipe(iconfontCss({
      fontName: fontName, // The name that the generated font will have
      path: 'templates/icons/_icons.scss', // The path to the template that will be used to create the SASS/LESS/CSS file
      targetPath: '../css/icons.css', // The path where the file will be generated
      fontPath: '../fonts/', // The path to the icon font file
      cssClass: 'icon',
      centerHorizontally: true,
      // normalize: true,
    }))
    .pipe(iconfont({
      normalize: true,
      fontName: fontName, // Name of the font
      formats: ['ttf', 'eot', 'woff', 'woff2'], // The font file formats that will be created
      prependUnicode: true, // recommended option
      fontHeight: 1001, // Tried lot of values, <1000 and also 10000, and 100000 :P but no success
      timestamp: runTimestamp // Recommended to get consistent builds when watching files
    }))
    .pipe(gulp.dest('fonts/'));
});

gulp.task('copy', function () {
  gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
  ])
    .pipe(gulp.dest('./js/'));
});

// Run drush to clear the theme registry
gulp.task('drush', function () {
  if (!running.cache) {
    running.cache = true;

    return gulp.src('', {
      read: false
    })
      .pipe(shell([
        // 'lando drush cr',
      ]))
      .pipe(notify({
        title: "Caches cleared",
        message: "Drupal caches cleared.",
        onLast: true
      }))
      .on('end', function () {
        running.cache = false;
      });
  }
  else {
    return gulp.src('', {
      read: false
    })
      .pipe(notify({
        title: "Caches cleared",
        message: "Drupal clear cache running.",
        onLast: true
      }));
  }
});

/**
 * Define a task to be called to instruct browser sync to reload.
 */
gulp.task('reload', function () {
});


/**
 * Defines the watcher task.
 */
gulp.task('watch', function () {
  gulp.watch(['templates/**/*.scss'], { usePolling: true }, ['sass', 'reload']);
  gulp.watch(['templates/**/*.js'], { usePolling: true }, ['js', 'reload']);
  gulp.watch(['icons/*.svg'], { usePolling: true }, ['iconfont', 'reload']);
  gulp.watch("templates/**/*.twig", ['drush', 'reload']);
  gulp.watch("**/*.yml", ['drush', 'reload']);
  gulp.watch("**/*.theme", ['drush', 'reload']);
  gulp.watch("src/*.php", ['drush', 'reload']);
});

gulp.task('default', ['watch']);
