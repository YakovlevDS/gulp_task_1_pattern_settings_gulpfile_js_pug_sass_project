const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass'))

const src = 'src/',
    dist = 'dist/';


const config = {
    src: {
        html: src + 'pug/index.pug',
        style: src + 'scss/**/*.scss',
        js: src + 'js/**/*.*',
        fonts: src + 'fonts/**/*.*',
        img: src + 'img/**/*.*'
    },
    dist: {
        html: dist,
        style: dist + 'css/',
        js: dist + 'js/',
        fonts: dist + 'fonts/',
        img: dist + 'img/'
    },
    watch: {
        html: src + 'pug/**/*.pug',
        style: src + 'scss/**/*.scss',
        js: src + 'js/**/*.*',
        fonts: src + 'fonts/**/*.*',
        img: src + 'img/**/*.*'
    }
}

const webServer = () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 9000,
        host: 'localhost',
        notify: false
    })
}

const pugTask = () => {
    return gulp.src(config.src.html)
        .pipe(pug())
        .pipe(pug({
            pretty: false
        }))
        .pipe(gulp.dest(config.dist.html))
        .pipe(browserSync.reload({ stream: true }))
}

const scssTask = () => {
    return gulp.src(config.src.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.dist.style))
        .pipe(browserSync.reload({ stream: true }))
}

const jsTask = () => {
    return gulp.src(config.src.js)
        .pipe(gulp.dest(config.dist.js))
        .pipe(browserSync.reload({ stream: true }))
}

const imgTask = () => {
    return gulp.src(config.src.img)
        .pipe(gulp.dest(config.dist.img))
        .pipe(browserSync.reload({ stream: true }))
}

const fontsTask = () => {
    return gulp.src(config.src.fonts)
        .pipe(gulp.dest(config.dist.fonts))
        .pipe(browserSync.reload({ stream: true }))
}

const watchFiles = () => {
    gulp.watch([config.watch.html], gulp.series(pugTask));
    gulp.watch([config.watch.style], gulp.series(scssTask));
    gulp.watch([config.watch.js], gulp.series(jsTask));
    gulp.watch([config.watch.img], gulp.series(imgTask));
    gulp.watch([config.watch.fonts], gulp.series(fontsTask));
}

const start = gulp.series(pugTask, scssTask, jsTask, imgTask, fontsTask);

exports.default = gulp.parallel(start, watchFiles, webServer);