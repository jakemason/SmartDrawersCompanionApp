module.exports = (gulp, packages, config) => {
    return () => {
        gulp.src(`${config.dir.src}/index.js`)
            .pipe(packages.webpack(require('../webpack.config')))
            .pipe(gulp.dest(`${config.dir.dist}/`))
    };
};