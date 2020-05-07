var colors = require('colors/safe');
module.exports = (options, app) => {
  return async (ctx, next) => {
    try {
      // console.log(colors.green(new Date().getTime()))
      let startTime = new Date().getTime()
      // 调用下一个 middleware
      await next()
      // 处理响应结果
      // 如果直接写入在 body 中，则不作处理
      // 如果写在 ctx.body 为空，则使用 state 作为响应
      ctx.body = ctx.body ? ctx.body : {
        code: ctx.state.code !== undefined ? ctx.state.code : (ctx.state.data !== undefined ? 200 : 404),
        data: ctx.state.data !== undefined ? ctx.state.data : [],
        message: ctx.state.message !== undefined ? ctx.state.message : (ctx.state.data !== undefined ? '成功了' : '请检查接口是否正确')
      }
      let endtime = new Date().getTime()
      console.log(colors.green(endtime - startTime))
    } catch (e) {
      // catch 住全局的错误信息
      app.logger.error(e)

      // 设置状态码为 200 - 服务端错误
      ctx.status = 500

      // 输出详细的错误信息
      ctx.body = {
        code: -1,
        error: e && e.message ? e.message : e.toString()
      }
    }
  }
}
