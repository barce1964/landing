var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var cleanCSS    = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dst"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.+(scss|sass|css)')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dst/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.+(js|json)", gulp.parallel('scripts'));
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dst/'));
});

gulp.task('scripts', function(){
    return gulp.src('src/js/**/*.+(js|json)')
        .pipe(gulp.dest('dst/js'));
});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dst/fonts'));
});

gulp.task('icons', function(){
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('dst/icons'));
});

gulp.task('php', function(){
    return gulp.src('src/php/**/*')
        .pipe(gulp.dest('dst/php'));
});

gulp.task('images', function(){
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dst/img'));
});

gulp.task('logo', function(){
    return gulp.src('src/logo/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dst/logo'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'php', 'images', 'logo'));