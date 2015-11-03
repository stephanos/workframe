const del = require('del');
const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const isparta = require('isparta');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const espower = require('gulp-espower');
const flowtype = require('gulp-flowtype');
const istanbul = require('gulp-istanbul');
const coveralls = require('gulp-coveralls');
const sourcemaps = require('gulp-sourcemaps');

var daemon = false
require("babel-core/register");
process.env.FLOW_BIN = path.join(process.cwd(), 'node_modules/flow-bin/vendor/flow');


function handleError(err, options) {
  gutil.log(err);
  if (!daemon) {
    process.exit(1);
  }
}


gulp.task('clean', function(done) {
  del.sync(['dist']);
  done();
});

gulp.task('build', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!daemon, eslint.failAfterError()));
});

gulp.task('typecheck', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(flowtype({
      abort: !daemon
    }));
});

gulp.task('test', function () {
  return gulp.src('src/**/*.spec.js')
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'dot'
    }))
    .on('error', handleError);
});

gulp.task('pre-test', function (done) {
  done()
  // return gulp.src(['src/**/*.js'])
  //   .pipe(babel())
  //   .pipe(istanbul({includeUntested: true, instrumenter: isparta.Instrumenter}))
  //   .pipe(istanbul.hookRequire());
});

gulp.task('coveralls', function (done) {
  if (!process.env.CI) {
    return done()
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls())
    .pipe(require('gulp-callback')(done));
});


gulp.task('watch', function () {
  gulp.watch(['src/**/*.js'], gulp.series('package'));
});

gulp.task('_daemon', (done) => {
  daemon = true
  done()
})


gulp.task('package',
  gulp.series('build', 'lint', 'typecheck', 'pre-test', 'test', 'coveralls'));

gulp.task('dev',
  gulp.series('_daemon', 'clean', 'package', 'watch'));

gulp.task('default',
  gulp.series('clean', 'package'));
