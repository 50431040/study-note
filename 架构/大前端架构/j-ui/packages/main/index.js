import JMain from "./Main.vue"
JMain.install = (app) => {
  app.component(JMain.name, JMain)
}

// 单独导出
export const Main = JMain
// 导出默认
export default JMain