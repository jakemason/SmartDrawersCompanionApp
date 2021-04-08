module.exports = (gulp, packages, config) => {
    return () => {
        gulp.src(`${config.dir.src}/styles/*.scss`)
            .pipe(packages.gulpif(
                config.functions.envCheck('prod', false),
                packages.sourcemaps.init()
            ))
            .pipe(packages.sassglob())
            .pipe(packages.sass({
                importer: packages.sassimport(),
            }).on('error', packages.sass.logError))
            .pipe(packages.autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            .pipe(packages.gulpif(
                config.functions.envCheck('prod', false),
                packages.sourcemaps.write()
            ))
            .pipe(packages.gulpif(
                config.functions.envCheck('prod'),
                packages.rename({
                    suffix: '.min',
                })
            ))
            .pipe(packages.gulpif(
                config.functions.envCheck('prod'),
                packages.cleanCSS() // Default Internet Explorer 10+
            ))
            .pipe(gulp.dest(`${config.dir.dist}/styles/`))
            .pipe(packages.gulpif(
                config.functions.envCheck('watch'),
                packages.bs.stream()
            ))
    };
};