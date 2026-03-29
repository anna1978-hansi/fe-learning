/**
 * 最简单的请求重试
 * @param {Function} requestFn - 返回 Promise 的函数
 * @param {number} maxAttempts - 最大尝试次数（默认 5）
 */
async function retryRequest(requestFn, maxAttempts = 5) {
  let lastError = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await requestFn()
      return res // ✅ 成功直接返回
    } catch (err) {
      lastError = err
      console.log(`第 ${attempt} 次失败`)

      // 👉 如果已经是最后一次，直接抛错
      if (attempt === maxAttempts) {
        throw lastError
      }

      // 👉 否则继续下一次循环（自动 retry）
    }
  }
}