export const gulp_text = `const { src, dest, watch } = require('gulp');
const replace = require('gulp-replace');
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpIgnore = require('gulp-ignore');

// Order of the files that they get concatenated in
const JsFiles = [
  'partial/js/ts/shortcuts/keymap.js',
  'partial/js/ts/docs.js',
  'partial/js/ts/mode/mode.js',
  'partial/js/**/*.js'
];

const matchExports = new RegExp(/export{[A-Za-z0-9_.,$]*};/gim);
const matchExportsNonMinified = new RegExp(/export /gim);
const matchImports = new RegExp(
  /import{[A-Za-z0-9_.,$]*}from"[A-Za-z0-9_./-]*";/gim
);
const matchImportsNonMinified = new RegExp(
  /import {[A-Za-z0-9_.,$ ]*} from ["'][A-Za-z0-9_.\/-]*["'];/gim
);
const matchUseStrict = new RegExp(/"use strict";/gim);

const miniBundle = () => {
  return (
    src(JsFiles)
      .pipe(minifyJs())
      .pipe(concat('main.min.js'))
      .pipe(replace(matchImports, ''))
      .pipe(replace(matchExports, ''))
      .pipe(replace(matchUseStrict, ''))
      // .pipe(replace(matchConsoleLogs, '')) Todo: turn on to remove console.logs
      .pipe(dest('dist/js'))
  );
};

const bundle = () => {
  return (
    src(JsFiles)
      .pipe(concat('main.js'))
      .pipe(replace(matchImportsNonMinified, ''))
      .pipe(replace(matchExportsNonMinified, ''))
      .pipe(replace(matchUseStrict, ''))
      // .pipe(replace(matchConsoleLogs, '')) Todo: turn on to remove console.logs
      .pipe(dest('dist/js'))
  );
};

const watchJs = () => watch('**/*.ts', miniBundle);
const watchBundle = () => watch('**/*.ts', bundle);

exports.miniBundle = miniBundle;
exports.bundle = bundle;
exports.watchJs = watchJs;
exports.watchBundle = watchBundle;
`;
