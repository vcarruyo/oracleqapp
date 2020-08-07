const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder
    filename: 'js/app.js' // JS output path
  },
  module: {
    rules: [
      // Include pug-loader to process the pug files
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      // Include css/style loaders to process our css files
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    // Extract our css to a seperate css file
    new ExtractTextPlugin('css/styles.css'),
    // Use HTMLWebpackPLugin with template set to our pug template.
    new HTMLWebpackPlugin({
      template: './views/index.pug'
    }),
    new HTMLWebpackPlugin({
      filename: 'autenticacion.html',
      template: './views/autenticacion.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'error.html',
      template: './views/error.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'instancias.html',
      template: './views/instancias.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'rinstancias.html',
      template: './views/rinstancias.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'sorteos.html',
      template: './views/sorteos.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'rsorteos.html',
      template: './views/rsorteos.pug',
    }),
    new HTMLWebpackPlugin({
      filename: 'tablero.html',
      template: './views/tablero.pug',
    }),
  ]
}