const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './bo-app/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve('', __dirname, '../../../resources/public/ui/'),
        publicPath: '',
        filename: 'bo_app.js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {"modules": false}],
                        'stage-0',
                        'react'
                    ]
                }
            },
            {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'}
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
