import axios from "axios"
import store from "../store"

class AjaxRequest {
    constructor() {
        this.baseURL = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000"
        this.timeout = 3000
        // 存放每次请求
        this.queue = {}
    }

    request(options) {
        const config = this.merge(options)
        const instance = axios.create()
        this.setInterceptor(instance, options.url)
        return instance(config)
    }

    merge(options) {
        return {
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout
        }
    }

    setInterceptor(instance, url) {
        // 请求拦截
        instance.interceptors.request.use((config) => {
            console.log(config)
            // config.headers.Authorization = "xx"

            // 并发请求时只显示一次
            if (!Object.keys(this.queue).length) {
                store.commit("showLoading")
            }
            this.queue[url] = url

            return config
        })
        // 响应拦截
        instance.interceptors.response.use((res) => {
            delete this.queue[url]
            // 全部请求结束后隐藏
            if (!Object.keys(this.queue).length) {
                store.commit("hideLoading")
            }
            
            return res.data
        }, err => {
            console.log(err)
        })
    }
}

export default new AjaxRequest()