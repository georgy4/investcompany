// Подключение пакетов
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer =require('gulp-autoprefixer');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps')
var pug = require('gulp-pug');
var del = require('del');
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var rename = require('gulp-rename');

// Задачи для Gulp

gulp.task('clean:build', function() {
  return del('./build');
});


gulp.task('scss', function() {
  return gulp.src('./src/scss/main.scss')
  .pipe(plumber({
    errorHandler: notify.onError(function(err){
      return {
        title: 'Styles',
        message: err.message
      }
    })
  }))
  .pipe(sourcemaps.init())
  .pipe(scss())
  .pipe( autoprefixer({
    overrideBrowserslist: ['last 3 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css'))
  .pipe(csso())
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src('./src/pug/pages/**/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Pug',
          message: err.message
        }
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});


gulp.task('copy:js', function() {
    return gulp.src('src/js/**/*')
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream())
});


gulp.task('copy:libs', function() {
  return gulp.src('src/libs/**/*')
    .pipe(gulp.dest('./build/libs'))
    .pipe(browserSync.stream())
});


gulp.task('copy:img', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream())
});



gulp.task('serve', gulp.series('clean:build', gulp.parallel('scss', 'pug', 'copy:js', 'copy:libs', 'copy:img'), function() {
    browserSync.init({
      server: {
        baseDir: './build/'
      }
    })

    gulp.watch('src/pug/**/*', gulp.series('pug'));
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/**/*.js', gulp.series('copy:js'));
    gulp.watch('src/libs/**/*', gulp.series('copy:libs'));
    gulp.watch('src/img/**/*', gulp.series('copy:img'));
}));

gulp.task('build', gulp.series('scss', 'pug', 'copy:js', 'copy:libs', 'copy:img'), function() {
    // content
});



gulp.task('default', gulp.series(['serve']));