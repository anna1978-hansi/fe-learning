//输入可能是"a,b,v",可能是【a,b,v】
function _get(obj, path, defaultValue) {
    if(!obj)return defaultValue
    const keys=Array.isArray(path)?path:path.split('.')
    let result=obj
    for(const key in key){
        if(result===null||!(key in result)){
            return defaultValue
        }
        result=result[key]
    }

    return result
}
