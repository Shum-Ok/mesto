const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/pages/index.js'}, //сборку проекта нужно осуществлять с этого файла
  output: { // куда поместить нашу сборку 
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: { // настройки для запуска локального сервера
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/', // делаем исклучения, что бы из этой папки ее переводил в старый код
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]',
        }
      }, 
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // эта библиотека добавить в html страницу адрес css файла
          { 
            loader: 
              'css-loader', 
              options: {
                importLoaders: 1
              },
          },
          "postcss-loader",
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ] 
}