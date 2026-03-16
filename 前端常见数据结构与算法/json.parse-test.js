/**
 * 
 * @param {*} str 
 * @returns  
 * 先看输入：const str = '{"name":"Tom","age":18,"hobby":["code","game"]}'
 */
/**
 * 
 * 思路：
 * 根据当前字符判断类型

{ → 对象

[ → 数组

" → 字符串

数字 → number

true/false/null
 */
/**
 * 
 * 1.空格必须自己skipWhitespace一个index一个index读取，trim只能去除头尾
 * 如果直接把空格替换，那么“tom Hello”-》“tomHello” 结果不符合预期。
 */
/**
 * 
 *一个解析函数到底应该把指针停在哪里？

答案其实非常明确，而且几乎所有解析器都遵守同一个规则：

函数负责完整消费自己的 token
并把指针停在 token 之后
 */
function myJSONParse(str) {
    let i=0;  //相当于index
    function parseValue(){
        skipWhitespace()  //处理空格
        //然后去匹配
        const char = str[i]

        if (char === '{') return parseObject()
        if (char === '[') return parseArray()
        if (char === '"') return parseString()
        if (char === 't') return parseTrue()
        if (char === 'f') return parseFalse()
        if (char === 'n') return parseNull()
            /**
             * 这一块相当于只规定了这几个case
             */
        return parseNumber()
    }
    /**
    * 此时i在{ 上，然后需要一个key，一个value解读，然后放入object
    */
    function parseObject(){
        const obj={}
        i++
        skipWhitespace()
        // 这里parseValue也是ok的，但是如果key是number代码也能跑；
        // 此时就是看你希望实现的效果，string可以拦截未知情况
        while (str[i] !== '}') {
            const key=parseString()
            //读取：
            skipWhitespace() 
            i++ // 跳过“：” 的读取，这里也可以做如果不是：则认为出错
            const value=parseValue();
            obj[key]=value
            if (str[i] === ',') {
                i++
                skipWhitespace()
            }
        }
        // i在} 处；这个token处理完
        i++
        return obj
    }
    function parseArray(){
        // ["code","game"]
        //i在【
        const arr=[]
        i++
        skipWhitespace()
        while(str[i]!==']'){
            const e=parseValue()
            arr.push(e)
            //去除末尾
            skipWhitespace()
            if(str[i]===','){
                i++
                skipWhitespace()
            }
        }
        i++
        return arr
    }
    function parseString(){
        //此时i在“ 上
        i++
        let start=i
        while(s[i]!=='"'){
            i++
        }
        //此时i在 “上，所以
        const result=str.slice(start,i)
        i++
        return result
    }
    function parseTrue(){

    }
    function parseFalse(){

    }
    function parseNull(){

    }
    function parseNumber(){

    }
    function skipWhitespace() {
        while (/\s/.test(str[i])) {
             i++
        }
    }
    return parseValue()  //这个函数去解析str，最后返回Object
}