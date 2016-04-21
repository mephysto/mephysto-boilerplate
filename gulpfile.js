/*

Gulp file // under development

 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require("gulp-jshint");
var combineMq = require('gulp-combine-mq');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');


// compile SCSS into CSS
gulp.task('sass', function () {
  gulp.src('./src/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'IE <= 9'], cascade: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    //.pipe(livereload()); // figure out to only reload styles instead of page refresh...
});

// watch js and scss folder for changes. run respective tasks when changed
gulp.task("watch", function() {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  //gulp.watch("./src/js/*.js", ["lint"]); // To be implemented
  //livereload.listen();
});

// check javascript for errors  
gulp.task("lint", function() {
  gulp.src("./src/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

// combine mediaqueries in css file together *EXPERIMENTAL*
gulp.task('cmq', function () {
  gulp.src('./build/css/styles.css')
    .pipe(combineMq({
      beautify: false
    }))
    .pipe(rename('styles.cmq.css'))
    .pipe(gulp.dest('./build/css/'));
});
// create minified CSS file from scss files UNTESTED
gulp.task('release', function () {
  gulp.src('./src/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/scss'));
});
gulp.task('default', ['watch']);
