const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/**
 * `..` Since this config file is in the config folder so we need
 * to resolve path in the top level folder.
 */
const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
    mode: 'development',
    entry: {
        // Since we need to load vue in the entry page.
        vue: 'vue',
        // This is where the `main-content` component is
        index: resolve('src/index.js'),
    },
    output: {
        filename: 'bundle.js',
        // Folder where the output of webpack's result go.
        path: resolve('dist'),
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'vue-style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                ]
            },
            {
                // vue-loader config to load `.vue` files or single file components.
                test: /\.vue$/,
                exclude: '/node_modules/',
                loader: 'vue-loader',
                options: {
                    cacheBusting: true,
                },
            },
            {
                // This is required for other javascript you are gonna write besides vue.
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
                include: [
                    resolve('src'),
                    resolve('node_modules/webpack-dev-server/client'),
                ],
            },
        ],
    },
    /**
     * There are multiple devtools available, check
     * https://github.com/webpack/webpack/tree/master/examples/source-map
     */
    devtool: '#eval-source-map',
    devServer: {
        //index: '',
        historyApiFallback: true,
        // The url you want the webpack-dev-server to use for serving files.
        host: 'localhost',
        port: 8071,
        // gzip compression
        compress: true,
        hot: true,
        inline: true,
        // Open the browser window, set to false if you are in a headless browser environment.
        open: false,
        /*
        proxy: {
            //TODO: hot reload doesn't work behind proxy. Fix this.
            '*': {
                //context: () => true,
                target: 'http://wpnew.test',
                changeOrigin: true,
            },
        },
        */
        watchOptions: {
            ignored: /node_modules/,
            poll: true,
        },
        // The path you want webpack-dev-server to use for serving files
        publicPath: '/dist/',
        // For static assets
        contentBase: resolve('src/assets'),
        // Reload for code changes to static assets.
        watchContentBase: true,
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.NamedModulesPlugin(),
        // Exchanges, adds, or removes modules while an application is running, without a full reload.
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        /**
         * The compiler-included build of vue which allows to use vue templates
         * without pre-compiling them
         */
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: ['*', '.vue', '.js', '.json'],
    },
    // webpack outputs performance related stuff in the browser.
    performance: {
        hints: false,
    },
};
