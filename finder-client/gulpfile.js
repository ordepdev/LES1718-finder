var gulp = require("gulp"),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    cleanCSS = require('gulp-clean-css'),
    watch = require("gulp-watch"),
    gutil = require('gulp-util'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    svgSprite = require('gulp-svg-sprite')

// SVG Config
var config = {
    mode: {
        symbol: { // symbol mode to build the SVG
            dest: 'sprites', // destination folder
            sprite: 'sprite.svg', //sprite name
            example: true // Build sample page
        }
    },
    svg: {
        xmlDeclaration: false, // strip out the XML attribute
        doctypeDeclaration: false // don't include the !DOCTYPE declaration
    }
};

gulp.task('sass', function () {
    return gulp.src('html/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('src/styles/'))
});

gulp.task('minify-css', function () {
    return gulp.src('src/styles/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('src/styles/'));
});

gulp.task('sprite-page', function () {
    return gulp.src('html/assets/svg/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('src/assets/'));
});


gulp.task('sprite-shortcut', function () {
    return gulp.src('src/assets/sprites/sprite.svg')
        .pipe(gulp.dest('src/styles/'));
});

gulp.task('watch', function () {
    gulp.watch(['html/assets/sass/**/*.scss'], ['sass']);
});

gulp.task('svg', ['sprite-page', 'sprite-shortcut']);

gulp.task('default', ['watch']);