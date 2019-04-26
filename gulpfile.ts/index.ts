import { parallel, src, dest } from 'gulp';
import browserify = require('browserify');
import tsify = require('tsify');
import source = require('vinyl-source-stream');
import * as watchify from 'watchify';
import * as fancy_log from 'fancy-log';
import * as uglify from 'gulp-uglify';
import * as sourcemaps from 'gulp-sourcemaps';
import buffer = require('vinyl-buffer');

function tastCopyHtml() {
  return src('src/index.html')
    .pipe(dest('dist'));
}

function tastCopyJs() {
  return src('src/**/*.js')
    .pipe(dest('dist'));
}

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {},
  standalone: 'test',
}).plugin(tsify));

function taskBulidTs() {
  return watchedBrowserify
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./', { addComment: false }))
    .pipe(dest("dist"));
}

const taskDefault = parallel(taskBulidTs, tastCopyHtml, tastCopyJs);

export { taskDefault as default };

watchedBrowserify.on("update", taskBulidTs);
watchedBrowserify.on("log", fancy_log);