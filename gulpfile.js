const {
  dest,
  series,
  parallel,
  src,
  task,
  watch
} = require('gulp');
const gulpAutoprefixer = require('gulp-autoprefixer');
const path = require('path');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

const config = {
  SASS_SOURCE_DIR: './source/sass/*.{sass,scss}',
  SASS_SOURCES: [
    './partials/**/*.{sass,scss}',
    './source/sass/**/*.{sass,scss}',
  ],
  SASS_OUT_DIR: './dist/'
};

task('compile-sass', function(cb) {
  return src(config.SASS_SOURCE_DIR)
    .pipe(sass({
      outputStyle: 'compressed'
    })).on('error', sass.logError)
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulpAutoprefixer())
    .pipe(dest(config.SASS_OUT_DIR));
});

task('watch-sass', function() {
  watch(config.SASS_SOURCES, series('compile-sass'));
});

task('grow-build', parallel('compile-sass'))

exports.build = parallel('compile-sass')
exports.default = series('compile-sass', parallel('watch-sass'))
