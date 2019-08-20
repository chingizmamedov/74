const path = require('path');
const fs = require('fs')
const miniCssExtract = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../docs')
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = PATH.src
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = {
  externals: {
    path: PATH
  },
  entry: `${PATH.src}/index.js`,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, `${PATH.dist}`)
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, `${PATH.src}/js`),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
          test: /\.(png|jpg|svg)$/,
          loader: 'file-loader',
          options: {
              name: '[name].[ext]'
          }
      },
      {
        test: /\.(sass|scss)$/,
          use: [
              'style-loader',
              miniCssExtract.loader,
              {
                  loader: 'css-loader',
                  options: { sourceMap: true }
              }, {
                  loader: 'sass-loader',
                  options: { sourceMap: true }
              }, {
                loader: 'postcss-loader',
                options: { sourceMap: true,
                           config: {
                               path: `${PATH.src}/js/postcss.config.js`
                           }   
                         }
            }
          ]
      }
    ]
  },
  plugins: [
    new miniCssExtract({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin([
        {
          from: `${PATH.src}/img`,
          to: 'assets'
        }
    ]),
     // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`
    }))
  ]
};