// 缓存名称，sw文件变化后会重新注册service Worker
const CACHE_NAME = "cache_v" + 4
// 缓存列表
const CACHE_LIST = [
    "/",
    "/index.html",
    "/index.css",
    "/main.js",
    "/api/img"
]

// 拦截客户端请求
self.addEventListener("fetch", function(e) {
    console.log(e.request.url)
})

// 预缓存
function preCache() {
    // 开启一个缓存空间
    return caches.open(CACHE_NAME).then(cache => {
        // 添加缓存列表
        return cache.addAll(CACHE_LIST)
    })
}

// 安装service Worker
self.addEventListener("install", function(e) {
    console.log("install")
    // 等待promise执行完成，skipWaiting：让新的service-worker installed后立即变为激活状态
    e.waitUntil(preCache().then(skipWaiting))
})

function clearCache() {
    return caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            if (key !== CACHE_NAME) {
                caches.delete(key)
            }
        }))
    })
}

// 激活service Worker
self.addEventListener("activate", function(e) {
    console.log("activate")
    e.waitUntil(Promise.all([
        // 清除过期缓存
        clearCache(),
        // service Worker立即生效
        self.cliemts.claim()
    ]))
})