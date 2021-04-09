module.exports = (packages, config) => {
    return () => {
        packages.bs.init(['*'], {
            // proxy: config.browserSync.proxy,
            port: config.browserSync.port,
            root: config.dir.root,
            // ui: false,
            online: false, // reduces start-up time
            open: {
                file: 'index.php'
            },
            server: {
                baseDir: "../.",
                index: "index.html"
            },
            notify: {
                styles: {
                    top: 'auto',
                    bottom: '0',
                    left: '0',
                }
            },
        });
    };
};