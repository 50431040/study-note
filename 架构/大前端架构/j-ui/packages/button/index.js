import JButton from "./Button.vue"
JButton.install = (app) => {
  app.component(JButton.name, JButton)
}

// 单独导出
export const Button = JButton
// 导出默认
export default JButton