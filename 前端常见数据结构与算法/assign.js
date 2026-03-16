/**
 * 
 * Object.assign(target, ...sources):

1. 如果 target 为 null 或 undefined → 报错
2. target = ToObject(target)

3. 对每个 source:
      如果 source 为 null/undefined → 跳过

      keys = source.[[OwnPropertyKeys]]()

      遍历 keys:
          如果 key 是 enumerable
              value = source[key]
              target[key] = value

4. 返回 target
 */
/**
 * 
 * 写法一：考虑到Symbol
 */
Object.myAssign = function(target, ...sources){

    if(target == null){
        throw new TypeError("Cannot convert undefined or null to object")
    }

    const to = Object(target)

    sources.forEach(source=>{
        if(source == null) return

        const keys = Reflect.ownKeys(source)

        keys.forEach(key=>{
            const desc = Object.getOwnPropertyDescriptor(source,key)

            if(desc.enumerable){
                to[key] = source[key]
            }
        })
    })

    return to
}

/**
 * 
 * 写法二：不考虑Symobl
 */

Object.myAssign = function(target,...sources){

    sources.forEach(source=>{
        for(let key in source){
            if(Object.prototype.hasOwnProperty.call(source,key)){
                target[key]=source[key]
            }
        }
    })

    return target
}