module.exports = (options, app) => {
  return async (ctx, next) => {
    let endpoint = ctx.path.split('/')[2]
    let endLogin = ctx.path.split('/')[3]
    // 如果是客户端获取权限直接过
    if (endpoint === 'client' && endLogin === 'getAuth') {
      await next()
    }
    // 如何是通用接口直接通过
    if (endpoint === 'common') {
      await next()
    }
    // 如果是客户端其他接口需要验签
    if (endpoint === 'client' && endLogin !== 'getAuth') {
      // let stamp = ctx.query.stamp
      // let public_key = ctx.query.public_key
      // let ip = ctx.ip

      // let make_private_key = ctx.helper.getAuthority(ip, public_key, stamp).auth
      // let private_key = await app.$Redis.getRedisString('client' + ip)
      // if (make_private_key === private_key) {
      //   await next()
      // } else {
      //   ctx.state = {
      //     code: 302,
      //     message: '涉嫌私自篡改页面，请刷新页面重试',
      //     data: []
      //   }
      // }
      await next()
    }
    // 如果是管理端登录，直接进行登录接口
    if (endpoint === 'admin' && endLogin === 'login') {
      await next()
    }
    // 如何是管理端其他操作则需要校验秘钥
    if (endpoint === 'admin' && endLogin !== 'login') {
      let stamp = ctx.query.stamp
      let public_key = ctx.query.public_key
      let ip = ctx.ip
      let userName = ctx.query.userName
      // 生成的私钥
      let make_private_key = ctx.helper.getAuthority(ip, public_key, stamp).auth
      // 存储的私钥
      let private_key = await app.$Redis.getRedisString(userName)
      console.log(make_private_key)
      console.log(private_key)
      if (make_private_key === private_key) {
        await next()
      } else {
        ctx.state = {
          code: 302,
          message: '登录已过期请重新登录',
          data: []
        }
      }
    }
  }
}
