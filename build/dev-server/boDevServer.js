'use strict';

/* eslint-disable */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

const port = process.argv[3] || '8080';

var devConfig = require('./boDevServer.config');

const webpackConfig = require('../conf/webpack.config.bo.js');

webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('development')
    }
}));

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
//webpackConfig.entry.push('webpack/hot/dev-server');
//webpackConfig.entry.push('webpack-dev-server/client?http://localhost:8080');

//This has to be an absolute path when running dev server this way, but that does not work in real Go-build?!
//webpackConfig.output.path = path.resolve(__dirname, webpackConfig.output.path, '');

var app = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    contentBase: './build/dev-server/boPublic',
    inline: true,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: { colors: true },
    disableHostCheck: true,
    setup: function (app) {
        devConfig.setup(app);
    }
});

app.listen(port, '0.0.0.0', function (error, result) {
    if (error) {
        console.log(error);
    }
    console.log('Listening at localhost:' + port);
});

devConfig.setupExternalMocks();
