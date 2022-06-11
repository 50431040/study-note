// 编译相关的工具方法
const CompileUtil = {
    // 根据表达式从vm的data中取值
    getVal(vm, expr) {
        return expr.split(".").reduce((data, cur) => data[cur], vm.$data)
    },
    setVal(vm, expr, value) {
        expr.split(".").reduce((data, cur, index, arr) => {
            if (index === arr.length - 1) {
                return data[cur] = value
            }
            return data[cur]
        }, vm.$data)
    },
    /**
     * 编译v-model
     * @param node 节点
     * @param expr 表达式
     * @param vm 实例
     */
    model(node, expr, vm) {
        // 更新方法
        const fn = this.updater['modelUpdater']
        // 给输入框加一个观察者，数据更新后会触发回调，给输入框赋新值
        new Watcher(vm, expr, (newVal) => {
            fn(node, newVal)
        })
        node.addEventListener('input', (e) => {
            // 输入内容
            const value = e.target.value
            this.setVal(vm, expr, value)
        })
        // 从data中取值
        const value = this.getVal(vm, expr)
        fn(node, value)
    },

    html(node, expr, vm) {
        // 更新方法
        const fn = this.updater['htmlUpdater']
        // 给输入框加一个观察者，数据更新后会触发回调，给输入框赋新值
        new Watcher(vm, expr, (newVal) => {
            fn(node, newVal)
        })
        const value = this.getVal(vm, expr)
        fn(node, value)
    },

    // 将模板语法全部替换
    getContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },

    /**
     * 编译文本节点
     * @param node 
     * @param expr 
     * @param vn 
     */
    text(node, expr, vm) {
        let fn = this.updater["textUpdater"]
        // 替换模板语法
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // 给模板语法加一个观察者，数据更新后会触发回调
            new Watcher(vm, args[1], () => {
                fn(node, this.getContentValue(vm, expr))
            })
            return this.getVal(vm, args[1])
        })
        fn(node, content)
    },

    updater: {
        modelUpdater(node, value) {
            node.value = value
        },

        htmlUpdater(node, value) {
            node.innerHTML = value
        },

        textUpdater(node,value) {
            node.textContent = value
        }
    },

    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, (e) => {
            vm[expr].call(vm, e)
        })
    }
}

class Dep {
    constructor() {
        // 存放watcher
        this.subs = []
    }

    // 订阅，添加watcher
    addSub(watcher) {
        this.subs.push(watcher)
    }

    // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update())   
    }
}

// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 存放一个初始值
        this.oldValue = this.get()
    }

    get() {
        // 临时变量
        Dep.target = this
        // 取值时会添加当前观察者（Dep.target）
        const value = CompileUtil.getVal(this.vm, this.expr)
        // 清除临时变量
        Dep.target = null
        return value
    }

    // 更新（数据变化后，调用此方法）
    update() {
        let newVal = CompileUtil.getVal(this.vm, this.expr)
        if (newVal !== this.oldValue) {
            this.cb(newVal)
            this.oldValue = newVal
        }
    }
}

// 数据劫持
class Observer {
    constructor(data) {
        this.observer(data)
    }

    observer(data) {
        // 是否为对象
        if (data && typeof data === "object") {
            for (let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }

    defineReactive(data, key, value) {
        this.observer(value)
        let dep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                // 创建watcher时会进行取值，进而调用当前getter方法
                // if (Dep.target) {
                //     console.log(`${key}添加了watcher`)
                // }
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                if (newVal !== value) {
                    // 赋值后重新劫持
                    this.observer(newVal)
                    value = newVal
                    // 发布
                    dep.notify()
                }
            }
        })
    }
}

// 基础类
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        const computed = options.computed
        const methods = options.methods

        // 传入了el，编译模板
        if (this.$el) {
            // 数据劫持
            new Observer(this.$data)

            // computed的实现，在编译模板时如果使用到了某个key会调用这里的get方法，然后watcher
            for (let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this)
                    }
                })
            }

            // methods的实现
            for (let key in methods) {
                Object.defineProperty(this, key, {
                    get() {
                        return methods[key]
                    }
                })
            }

            // vm上的属性操作代理到vm.$data上
            this.proxyVm(this.$data)
            
            new Compiler(this.$el, this)
        }
    }

    proxyVm(data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}

// 编译
class Compiler {
    constructor(el, vm) {
        // 判断el属性，el可能是字符串，也可能是DOM节点
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        // 将当前节点元素放到内存中（转为文档碎片）
        let fragment = this.node2Fragement(this.el)

        // 节点替换

        // 编译模板
        this.compile(fragment)

        // 替换页面内容

        this.el.appendChild(fragment)
    }

    // 是否是节点
    isElementNode(node) {
        return node.nodeType === 1
    }

    // 转为文档碎片
    node2Fragement(node) {
        let fragment = document.createDocumentFragment()
        let firstChild

        while(firstChild = node.firstChild) {
            // appendChild 有移动性
            fragment.appendChild(firstChild)
        }

        return fragment
    }

    // 核心编译
    compile(node) {
        // 子节点，类数组
        let childNodes = node.childNodes
        Array.from(childNodes).forEach(child => {
            // 是否是元素节点
            if (this.isElementNode(child)) {
                this.compileElement(child)
                // 元素节点还需要编译子节点
                this.compile(child)
            } else {
                this.compileText(child)
            }
        })
    }

    // 编译元素节点中的指令
    compileElement(node) {
        // 获取标签属性，类数组
        let attributes = node.attributes
        Array.from(attributes).forEach(attr => {
            // attr值是一个对象
            console.dir(attr)

            const { name, value: expr } = attr

            // 判断属性是否为指令
            if (this.isDirective(name)) {
                let [, directive] = name.split("-")
                let [directiveName, eventName] = directive.split(":")
                CompileUtil[directiveName](node, expr, this.vm, eventName)
            }
        })
    }

    // 编译文本节点中的模板语法（{{}}）
    compileText(node) {
        let content = node.textContent

        // 匹配模板
        if (/\{\{(.+?)\}\}/.test(content)) {
            CompileUtil["text"](node, content, this.vm)
        }
    }

    // 是否是指令
    isDirective(attrName) {
        return attrName.startsWith("v-")
    }
}