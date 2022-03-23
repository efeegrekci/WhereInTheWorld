const gulp = require('gulp');
const browserSync = require('browser-sync');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));


var JSDirPage = 'src/assets/js/main/';
var JSDirVendors = 'src/assets/js/vendors/';
var CSSDirMaster = 'src/assets/css/';

var JSFilesMaster = [
    JSDirVendors + "jquery.js",
    JSDirVendors + "axios.min.js",
    JSDirVendors + "select2.js",
    JSDirPage + "main.js",
];
gulp.task('jsMaster', function () {
    return gulp.src(JSFilesMaster)
        .pipe(concat('master.min.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('src/assets/js'))
        .pipe(browserSync.stream());
});
var CSSFilesMaster = [
    CSSDirMaster + "_font.css",
    CSSDirMaster + "_reset.css",
    CSSDirMaster + "_select2.css",
    CSSDirMaster + "main.css",
];
gulp.task('cssMaster', function () {
    return gulp.src(CSSFilesMaster)
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('master.min.css'))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task("sass", function () {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});


gulp.task("watch", function() {
    gulp.watch("src/assets/scss", gulp.series("cssMaster"));
    gulp.watch("src/assets/js", gulp.series("jsMaster"));
});


gulp.task("default", gulp.parallel("jsMaster", "cssMaster"));