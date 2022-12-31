const path = require("path")

const {
  VueLoaderPlugin
} = require("vue-loader")

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
    // 单独构建
    aside: "./packages/aside",
    button: "./packages/button",
    container: "./packages/container",
    header: "./packages/header",
    main: "./packages/main",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "lib"),
    library: {
      name: "JUI",
      type: "umd"
    },
    clean: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: {
        loader: "vue-loader"
      }
    }, ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  // 排除掉vue源码
  externals: ["vue"]
}