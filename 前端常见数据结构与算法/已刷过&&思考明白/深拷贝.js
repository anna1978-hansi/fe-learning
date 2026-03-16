/**
 * 
 * @param {} obj 
 * @param {*} map 
 */
//这里clone传入的obj可能是很多类型。
//1. obj 这个直接对象实现key-value就好
//2.如果是其他Array这种类型的话，你需要使用那些构造函数；
//不然 至少key-value，会丢失Array.prototype上面特定的方法。是这样吗？
function deepClone(target, map = new WeakMap()) {

    // primitive
    if (target === null || typeof target !== 'object') {
        return target
    }

    // 循环引用
    if (map.has(target)) {
        return map.get(target)
    }

    let clone

    if (Array.isArray(target)) {
        clone = []

    } else if (target instanceof Map) {
        clone = new Map()

    } else if (target instanceof Set) {
        clone = new Set()

    } else {
        clone = {}
    }

    map.set(target, clone)

    // Map 处理
    if (target instanceof Map) {
        for (const [key, value] of target) {
        clone.set(
            deepClone(key, map),
            deepClone(value, map)
        )
    }   
        return clone
    }

    // Set 处理
    if (target instanceof Set) {
        target.forEach(value => {
            clone.add(deepClone(value, map))
        })
        return clone
    }

    // 普通对象 / 数组
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            clone[key] = deepClone(target[key], map)
        }
    }

    return clone
}

