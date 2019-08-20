const merge = require('webpack-merge')
const mainConf = require('./webpack.config')

const prodConfig = merge(mainConf, {
    mode: 'production',
})

module.exports = prodConfig