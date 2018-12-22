const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: ['./js/index.js', './assets/scss/app.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          } 
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'resolve-url-loader']
      },
      {
        test    : /\.(woff(2)?|eot|ttf|otf)$/,
        loader  : 'url-loader',
        options : {
          name: '[name].[ext]',
          outputPath: 'assets/fonts/',
          limit: 10000
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/',
              limit: 10000
            }
          }
        ]
      },
      { 
        test: /\.html$/, 
        use: ['html-loader'] 
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      // Change to your favicon location
      favicon: ''
    })
  ],
  devServer: {
    stats: 'errors-only',
    //open: true,
    // You may need the option below. DON'T USE IN A PUBLIC SERVER
    disableHostCheck: true,
    port: 5555,
    compress: true
  },
  devtool: 'inline-source-map'
}

module.exports = config;