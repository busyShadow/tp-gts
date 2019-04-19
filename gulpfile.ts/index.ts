import { dest, series, src } from 'gulp'
import * as ts from 'gulp-typescript'
import * as clean from 'gulp-clean';
import * as browserify from 'browserify';
import * as tsify from 'tsify';
import * as source from 'vinyl-source-stream';
import * as watchify from 'watchify';
import * as fancy_log from 'fancy-log';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';
import * as buffer from 'vinyl-buffer';

const tsProject = ts.createProject("tsconfig.json");

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

function taskClean(cb) {
  return src(['dist/*'])
    .pipe(clean());
};

function taskCopyHtml() {
  return src(['src/*.html'])
    .pipe(dest("dist"));
};

function taskBuildJs() {
  return watchedBrowserify
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(dest("dist"));
};

const taskDefault = series(taskClean, taskCopyHtml, taskBuildJs);

watchedBrowserify.on("update", taskBuildJs);
watchedBrowserify.on("log", fancy_log);

export { taskDefault as default };