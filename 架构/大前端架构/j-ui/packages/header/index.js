import JHeader from "./Header.vue"
JHeader.install = (app) => {
  app.component(JHeader.name, JHeader)
}

// 单独导出
export const Header = JHeader
// 导出默认
export default JHeader