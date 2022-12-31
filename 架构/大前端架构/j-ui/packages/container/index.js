import JContainer from "./Container.vue"
JContainer.install = (app) => {
  app.component(JContainer.name, JContainer)
}

// 单独导出
export const Container = JContainer
// 导出默认
export default JContainer