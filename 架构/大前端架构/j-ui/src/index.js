const { name, version } = require("../package.json")

import * as Components from "../packages"

// 按需导入
export * from "../packages"

console.log(Components)

// 全局注册
const install = (app) => {
  Object.keys(Components).forEach(key => {
    console.log(Components[key])
    app.use(Components[key])
  })
}

export default {
  name,
  version,
  install,
  ...Components
}