module.exports = (options, app) => {
  return async (ctx, next) => {
    await next()
    if (ctx.state.code !== 306) {
      return true
    }
    ctx.state.data = []
    ctx.state.message = '缺少必要参数'
  }
}
