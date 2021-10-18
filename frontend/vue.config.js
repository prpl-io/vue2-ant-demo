const config = require('./src/config');

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
    publicPath: config.publicPath,
    configureWebpack: {
        // We provide the app's title in Webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: 'Vue2 Demo - Admin CMS',
        // Set up all the aliases we use in our app.
        performance: {
            // Only enable performance hints for production builds,
            // outside of tests.
            hints:
                process.env.NODE_ENV === 'production' &&
                !process.env.VUE_APP_TEST &&
                'warning'
        }
    },
    css: {
        // Enable CSS source maps.
        sourceMap: true
    },
    // Configure Webpack's dev server.
    // https://cli.vuejs.org/guide/cli-service.html
    devServer: {
        port: config.port
    }
};
