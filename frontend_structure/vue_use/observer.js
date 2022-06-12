// 数据源
let obj = {
    name: "jlq",
    age: {
        value: 18
    }
}

// 数据劫持
function observer(data) {
    if (typeof data === "object") {
        for (let key in data) {
            defineReactive(data, key, data[key])
        }
    }
}

function defineReactive(data, key, value) {
    // 递归
    observer(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newVal) {
            // 对设置的值进行劫持
            observer(newVal)
            console.log("数据更新了")
            value = newVal
        }
    })
}

observer(obj)
// obj.name = "ljl"
// console.log(obj.name)

// obj.age.value = 18

// obj.age = {
//     name: 1
// }

// 如果属性不存在，增加的属性不会更新视图
obj.age.name = 2

obj.age = [1, 2, 3]
// 数组的操作也不会更新视图
// obj.age.push(4)

// 内部重写了数组的一些方法
const arr = ["push", "pop", "shift", "unshift"]
arr.forEach((method) => {
    // 原始方法
    let old = Array.prototype[method]
    Array.prototype[method] = function() {
        console.log("数据更新了2")
        old.apply(this, arguments)
    }
})

obj.age = [1, 2, 3]
obj.age.push(4)
// 仍然无法监听到数据长度的变化、数据某一项的变化