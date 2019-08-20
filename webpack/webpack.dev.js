const merge = require('webpack-merge')
const path = require('path');
const webpack = require('webpack')
const mainConf = require('./webpack.config')

const devConfig = merge(mainConf, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        contentBase: mainConf.externals.path.dist,
        port: 9000,
        overlay: true
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

module.exports = devConfig