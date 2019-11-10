// Подключение пакетов
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer =require('gulp-autoprefixer');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps')
var pug = require('gulp-pug');
var del = require('del');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

// Задачи для Gulp

gulp.task('clean:build', function() {
  return del('./build');
});


gulp.task('less', function() {
  return gulp.src('./src/less/main.less')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe( autoprefixer({
      overrideBrowserslist: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
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
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream())
});


gulp.task('copy:fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.stream())
});



gulp.task('server', gulp.series('clean:build', gulp.parallel('scss', 'pug', 'copy:js', 'copy:libs', 'copy:img','copy:fonts'), function() {
    browserSync.init({
      server: {
        baseDir: './build/'
      }
    })

    gulp.watch('src/pug/**/*', gulp.series('pug'));
    // gulp.watch('src/less/**/*.less', gulp.series('less'));
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/**/*.js', gulp.series('copy:js'));
    gulp.watch('src/libs/**/*', gulp.series('copy:libs'));
    gulp.watch('src/img/**/*', gulp.series('copy:img'));
    gulp.watch('src/fonts/**/*', gulp.series('copy:fonts'));
}));


gulp.task('default', gulp.series(['server']));