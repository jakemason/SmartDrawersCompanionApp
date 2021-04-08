const gulp = require('gulp');
const path = require('path');
const config = {
    "dir": {
        root: path.resolve(process.env.PWD),
        src: path.join(process.env.PWD, 'src'),
        dist: path.join(process.env.PWD, 'dist')
    },
    "functions": {
        envCheck: require('./functions/envCheck'),
    },
    "browserSync": {
        port: 9001,
        proxy: "https://wpnew.test",
        ui: false
    }
};

const packages = {
    bs: require('browser-sync').create(),
    del: require('del'),
    autoprefixer: require('gulp-autoprefixer'),
    sass: require('gulp-sass'),
    sourcemaps: require('gulp-sourcemaps'),
    gulpif: require('gulp-if'),
    uglify: require('gulp-uglify'),
    cleanCSS: require('gulp-clean-css'),
    runSequence: require('run-sequence'),
    rename: require('gulp-rename'),
    sassglob: require('gulp-sass-glob'),
    sassimport: require('node-sass-package-importer'),
    imagemin: require('gulp-imagemin'),
    webpack: require('webpack-stream')
};

const tasks = {
    styles: require('./tasks/gulp.styles'),
    clean: require('./tasks/gulp.clean'),
    browserSync: require('./tasks/gulp.browserSync'),
    images: require('./tasks/gulp.images'),
    scripts: require('./tasks/gulp.scripts')
};

gulp.task('styles', tasks.styles(gulp, packages, config));
gulp.task('images', tasks.images(gulp, packages, config));
gulp.task('clean', tasks.clean(gulp, packages, config));
gulp.task('browserSync', tasks.browserSync(packages, config));
gulp.task('scripts', tasks.scripts(gulp, packages, config));

gulp.task('watch', ['browserSync'], () => {
    let src = '../src';
    gulp.watch(`${src}/styles/**/*`, ['styles']);
    gulp.watch(`${src}/components/**/*`, ['scripts', packages.bs.reload]);

    // Kill gulp process if we edit our gulpfile
    gulp.watch(`${config.dir.root}/build/**/*`).on('change', () => {
        process.exit(0)
    });
});

gulp.task('default', callback => {
    packages.runSequence('clean', ['styles', 'images', 'scripts'], callback);
});
