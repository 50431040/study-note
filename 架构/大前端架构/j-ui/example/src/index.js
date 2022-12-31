import { createApp } from "vue"
import App from "./App.vue"
import JUI from "../../src/index"
import "../../src/styles/index.scss"

console.log(JUI)
createApp(App).use(JUI).mount("#app")