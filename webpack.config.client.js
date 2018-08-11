const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",
    path.join(CURRENT_WORKING_DIR, "client/main.js")
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: "file-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{loader: "style-loader"}, 
          { loader: "postcss-loader"},
        {loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[name]_[local]_[hash:base64]",
            sourceMap: true,
            minimize: true}
      }],
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

module.exports = config