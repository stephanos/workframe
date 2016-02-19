'use strict';

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

let daemon = false;
require('babel-core/register');
process.env.FLOW_BIN = path.join(process.cwd(), 'node_modules/flow-bin/vendor/flow');


function handleError(err) {
  gutil.log(err);
  if (!daemon) {
    process.exit(1);
  }
}


gulp.task('clean', (done) => {
  del.sync(['dist', 'coverage']);
  done();
});

gulp.task('build', () =>
  gulp.src(['src/**/*.js', 'it/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'it/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!daemon, eslint.failAfterError()))
);

gulp.task('typecheck', () =>
  gulp.src(['src/**/*.js', 'it/**/*.js'])
    .pipe(flowtype({
      abort: !daemon,
    }))
);

gulp.task('unit-test', (done) => {
  gulp.src(['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.it.js'])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('src/**/*.spec.js', { read: false })
        .pipe(espower())
        .pipe(mocha({
          ui: 'bdd',
          reporter: 'dot',
        }))
        .on('error', (err) => {
          handleError(err);
          done();
        })
        .pipe(istanbul.writeReports({
          dir: 'coverage',
          reportOpts: { dir: 'coverage' },
          reporters: ['lcov'],
        }))
        .on('end', done);
    });
});

gulp.task('integration-test', (done) => {
  gulp.src(['it/**/*.js', 'src/**/*.it.js'], { read: false })
    .pipe(espower())
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'dot',
    }))
    .on('error', (err) => {
      handleError(err);
      done();
    })
    .pipe(require('gulp-callback')(done));
});

gulp.task('coveralls', (done) => {
  if (!process.env.CI) {
    return done();
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls())
    .pipe(require('gulp-callback')(done));
});


gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'lib/**/*.js', 'it/**/*.js'],
    gulp.series('package'));
});

gulp.task('_daemon', (done) => {
  daemon = true;
  done();
});


gulp.task('package',
  gulp.series('build', 'lint', 'typecheck', 'unit-test', 'integration-test', 'coveralls'));

gulp.task('dev',
  gulp.series('_daemon', 'clean', 'package', 'watch'));

gulp.task('default',
  gulp.series('clean', 'package'));
