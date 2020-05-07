const uuidv1 = require('uuid/v1')
const sha1 = require('sha1')
module.exports = {
  // 权限加密
  getAuthority (ip, auth, timeStamp) {
    let authStr = auth || uuidv1()
    let localIp = ip
    let stamp = timeStamp || new Date().getTime()

    return {
      auth: sha1(`${authStr}&${stamp}&${localIp}`),
      authStr,
      stamp,
      localIp
    }
  },
  // 处理日期
  makeDate (date = new Date()) {
    let currentDate = new Date(date)
    let year = currentDate.getFullYear()
    let month:number | string = currentDate.getMonth() + 1
    let day:number | string = currentDate.getDate()
    let hour:number | string = currentDate.getHours()
    let minute:number | string = currentDate.getMinutes()
    let seconds = currentDate.getSeconds()
    let timeStamp = currentDate.getTime()
    // 计算到今天的天数
    let totayStamp = new Date().getTime()
    let instans = totayStamp - timeStamp
    let days = Math.ceil(instans / 1000 / 3600 / 24)

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    let dayNum = new Date(year,parseInt(<string>month),0).getDate()
    return {
      timeStamp,
      year,
      month,
      day,
      hour,
      minute,
      dayNum,
      days,
      date: year + '-' + month + '-' + day,
      dataTime: `${year}-${month}-${day} ${hour}:${minute}:${seconds}`,
      dateWord: `${year}年${month}月${day}日`,
      dateTimeWord: `${year}年${month}月${day}日 ${hour}:${minute}:${seconds}`,
      dateTimeNo: `${year}年${month}月${day}日 ${hour}:${minute}`
    }
  }
}
