'use strict';

const del = require('del');
const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const isparta = require('isparta');
const gulpif = require('gulp-if');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const espower = require('gulp-espower');
const flowtype = require('gulp-flowtype');
const istanbul = require('gulp-istanbul');
const coveralls = require('gulp-coveralls');
const sourcemaps = require('gulp-sourcemaps');

let daemon = false;
process.env.FLOW_BIN = path.join(process.cwd(), 'node_modules/flow-bin/vendor/flow');


function handleError(err) {
  gutil.log(err);
  if (!daemon) {
    process.exit(1);
  }
}


gulp.task('clean', (done) => {
  del.sync(['build', 'coverage']);
  done();
});

gulp.task('build', () =>
  gulp.src(['src/**/*.js', 'it/**/*.js'])
    .pipe(cache('build'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        'node5',
        'stage-1',
      ],
      plugins: [
        'workframe',
        'transform-decorators-legacy',
      ],
    }))
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/test'))
);

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'it/**/*.js'])
    .pipe(cache('lint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!daemon, eslint.failAfterError()))
);

gulp.task('typecheck', () =>
  gulp.src(['src/**/*.js', 'it/**/*.js'])
    .pipe(cache('flow'))
    .pipe(babel({
      plugins: [
        'syntax-async-functions',
        'syntax-class-properties',
        'syntax-decorators',
        'syntax-flow',
        ['workframe', {
          typecheckOnly: true,
        }],
      ],
    }))
    .on('error', handleError)
    .pipe(gulp.dest('build/chk'))
    .pipe(flowtype({
      abort: !daemon,
    }))
);

gulp.task('unit-test', (done) => {
  gulp.src(['build/test/**/*.js', '!build/test/**/*.spec.js', '!build/test/**/*.it.js'])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('build/test/**/*.spec.js', { read: false })
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
  gulp.src(['build/test/**/*.it.js'], { read: false })
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
