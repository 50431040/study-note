import JAside from "./Aside.vue"
JAside.install = (app) => {
  app.component(JAside.name, JAside)
}

// 单独导出
export const Aside = JAside
// 导出默认
export default JAside