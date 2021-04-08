module.exports = (gulp, packages, config) => {
    return () => {
        gulp.src(`${config.dir.src}/images/**/*`)
            .pipe(packages.imagemin())
            .pipe(gulp.dest(`${config.dir.dist}/images/`))
    };
};