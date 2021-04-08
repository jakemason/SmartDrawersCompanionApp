module.exports = (gulp, packages, config) => {
    return () => {
        return Promise.all([
            packages.del([`${config.dir.dist}/**/*`], {force: true})
        ])
    }
};