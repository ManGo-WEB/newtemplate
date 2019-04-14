const gulp = require('gulp'),
const watch = require('gulp-watch'),
const autoprefixer = require('gulp-autoprefixer'),
const cleanCSS = require('gulp-clean-css'),
const sass = require('gulp-sass'),
const concat = require('gulp-concat'),
const rename = require('gulp-rename'),
const uglify = require('gulp-uglify'),
const sourcemaps = require('gulp-sourcemaps'),
const rigger = require('gulp-rigger'),
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');
const rimraf = require('rimraf');




gulp.task('minify-css', () => {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', () =>
    gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

(async () => {
    await imagemin(['images/*.png'], 'build/images', {
        plugins: [
            imageminPngquant()
        ]
    });
 
    console.log('Images optimized');
})();

gulp.task('default', () =>
    gulp.src('src/images/*')
        .pipe(imagemin([
				    imagemin.gifsicle({interlaced: true}),
				    imagemin.jpegtran({progressive: true}),
				    imagemin.optipng({optimizationLevel: 5}),
				    imagemin.svgo({
				        plugins: [
				            {removeViewBox: true},
				            {cleanupIDs: false}
				        ]
				    })
				]))
        .pipe(gulp.dest('dist/images'))
);