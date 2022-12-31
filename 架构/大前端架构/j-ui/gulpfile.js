const {
  series,
  src,
  dest
} = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const sassGlob = require("gulp-sass-glob")
const postcss = require("gulp-postcss")
// 兼容性
const autoprefixer = require("autoprefixer")
// 压缩
const cassnano = require("cssnano")

function scss() {
  const plugins = [
    autoprefixer(),
    cassnano()
  ]

  return src("src/styles/*.scss")
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(dest("lib/styles"))
}

exports.default = series(scss)