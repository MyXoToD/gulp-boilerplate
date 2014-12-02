/*
 * Require gulp and all the modules
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util');

/*
 * Gulp default task
 */
gulp.task('default', ['styles', 'scripts'], function() {
  // Watch style changes
  gulp.watch('./assets/stylesheets/sass/*', ['styles']);

  // Watch script changes
  gulp.watch('./assets/javascripts/coffee/*', ['scripts']);
});

/*
 * Gulp tasks for stylesheets
 */
gulp.task('styles', function() {
  gulp.src(
    [
      './assets/stylesheets/sass/application.scss', 
      './assets/stylesheets/sass/media-queries.scss'
    ]
  )
  .pipe(sass())
  .pipe(prefix("last 2 version", "ie 9"))
  .pipe(cssmin())
  // .pipe(rename({suffix: ".min"}))
  .pipe(concat('application.min.css'))
  .pipe(gulp.dest('./assets/stylesheets'));
});

/*
 * Gulp task for javascripts
 */
gulp.task('scripts', function() {
  gulp.src(
    [
      './assets/javascripts/libs/*.*', // Load libraries first
      './assets/javascripts/coffee/*.*' // Then custom scripts
    ]
  )
  .pipe(gulpif(/[.]coffee$/, coffee({bare: true}).on('error', gutil.log)))
  .pipe(uglify())
  // .pipe(rename({suffix: '.min'}))
  .pipe(concat('application.min.js'))
  .pipe(gulp.dest('./assets/javascripts'));
});