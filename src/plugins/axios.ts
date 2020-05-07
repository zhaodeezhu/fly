import axios from 'axios'
// import Cookie from 'js-cookie'
import { message } from 'antd'
const instance = axios.create({
  // baseURL: 'http://127.0.0.1:7001/api', // http://172.17.26.55:3000/index
  baseURL: 'http://127.0.0.1:5555/api',
  timeout: 10000
})

instance.interceptors.request.use(config => {
  // console.log(config)
  // if (config.url === '/client/getAuth') {

  // } else {
  //   let auth = Cookie.get('auth') ? JSON.parse(Cookie.get('auth')) : null

  //   config.params = {
  //     ...config.params,
  //     ...auth
  //   }
  // }

  return config
})

instance.interceptors.response.use(res => {
  // if (res.data.code === 302) {
  //   message.warning(res.data.message)
  //   Cookie.remove('user')
  //   window.location = '/login'
  // }

  return res.data
})

export default instance

