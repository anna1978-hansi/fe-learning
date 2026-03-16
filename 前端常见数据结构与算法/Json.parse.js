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
function myJSONParse(str) {
  let i = 0

  function parseValue() {
    skipWhitespace()

    const char = str[i]

    if (char === '{') return parseObject()
    if (char === '[') return parseArray()
    if (char === '"') return parseString()
    if (char === 't') return parseTrue()
    if (char === 'f') return parseFalse()
    if (char === 'n') return parseNull()
    
    return parseNumber()
  }

  function parseObject() {
    const obj = {}
    i++ // 跳过 {

    skipWhitespace()

    while (str[i] !== '}') {
      const key = parseString()

      skipWhitespace()
      i++ // 跳过 :

      const value = parseValue()
      obj[key] = value

      skipWhitespace()

      if (str[i] === ',') {
        i++
        skipWhitespace()
      }
    }

    i++ // 跳过 }
    return obj
  }

  function parseArray() {
    const arr = []
    i++ // 跳过 [

    skipWhitespace()

    while (str[i] !== ']') {
      const value = parseValue()
      arr.push(value)

      skipWhitespace()

      if (str[i] === ',') {
        i++
        skipWhitespace()
      }
    }

    i++ // 跳过 ]
    return arr
  }

  function parseString() {
    i++ // 跳过 "
    let start = i

    while (str[i] !== '"') {
      i++
    }

    const result = str.slice(start, i)
    i++ // 跳过 "
    return result
  }

  function parseNumber() {
    let start = i
    /**
     * 纯整数的判断条件：'0' <= c <= '9'
     */
    while (/[0-9.-]/.test(str[i])) {
      i++
    }

    return Number(str.slice(start, i))
  }

  function parseTrue() {
    i += 4
    return true
  }

  function parseFalse() {
    i += 5
    return false
  }

  function parseNull() {
    i += 4
    return null
  }

  function skipWhitespace() {
    while (/\s/.test(str[i])) {
      i++
    }
  }

  return parseValue()
}