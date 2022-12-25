const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

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
  devServer: {
    static: [
      path.resolve(__dirname, "example/dist"),
      path.resolve(__dirname, "dist"),
    ],
    port: 8000,
    host: "localhost"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "example/public/index.html"),
      filename: "index.html",
      chunks: ["index"]
    })
  ]
}