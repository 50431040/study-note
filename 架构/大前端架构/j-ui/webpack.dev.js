const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./example/src/index.js"
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    static: [
      path.resolve(__dirname, "example/dist"),
      path.resolve(__dirname, "dist"),
    ],
    port: 8000,
    host: "localhost"
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "example/public/index.html"),
      filename: "index.html",
      chunks: ["index"]
    })
  ]
}