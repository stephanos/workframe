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
const rename = require('gulp-rename');
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
  del.sync(['dist', 'coverage']);
  done();
});

gulp.task('build', () =>
  gulp.src(['src/**/*.js', '!src/it/**'])
    .pipe(cache('dist'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        'node6',
        'stage-1',
      ],
      plugins: [
        'flow-comments',
      ],
    }))
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);

gulp.task('build-it', () =>
  gulp.src(['src/it/**/*.js', '!src/**/*.t.js'])
    .pipe(cache('dist'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        'node6',
        'stage-1',
      ],
      plugins: [
        'decorator-metadata',
        // 'type-metadata',
        'transform-decorators-legacy',
        'flow-comments',
        'workframe',
      ],
    }))
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/it'))
);

gulp.task('lint', () =>
  gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!daemon, eslint.failAfterError()))
);

gulp.task('generate', () =>
  gulp.src('src/**/*.t.js')
    .pipe(babel({
      plugins: [
        'babel-plugin-syntax-flow',
        'babel-plugin-syntax-decorators',
        'babel-plugin-syntax-class-properties',
        ['immutable-record', {
          decorator: 'Data',
        }],
      ],
    }))
    .on('error', handleError)
    .pipe(rename((path) => { path.basename = path.basename.replace('.t', '') }))
    .pipe(gulp.dest('src'))
);

gulp.task('unit-test', (done) => {
  gulp.src(['dist/**/*.js', '!dist/**/*.spec.js', '!dist/**/*.it.js'])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('dist/**/*.spec.js', { read: false })
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
  gulp.src(['dist/**/*.it.js'], { read: false })
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
  gulp.watch(['src/**/*.t.js'], gulp.series('generate'));
  gulp.watch(['src/**/*.js', 'lib/**/*.js', '!src/**/*.t.js'], gulp.series('package'));
});

gulp.task('_daemon', (done) => {
  daemon = true;
  done();
});


gulp.task('package',
  gulp.series('build', 'build-it', 'lint', 'unit-test', 'integration-test', 'coveralls'));

gulp.task('dev',
  gulp.series('_daemon', 'clean', 'generate', 'package', 'watch'));

gulp.task('default',
  gulp.series('clean', 'generate'));
