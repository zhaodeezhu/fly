import * as nodemailer from 'nodemailer';
const mysqlDb = require('../module/mysqldb')
const redisDb = require('../module/redis')
const SQL = Symbol('Application#$Sql')
const RedisDb = Symbol('Application#$Redis')

const selfConsoleLog = require('../module/console')

export default {
  /** mysql数据查询 */
  get $Sql () {
    if(!this[SQL]) {
      this[SQL] = mysqlDb
    }
    return this[SQL]
  },
  /** redis查询 */
  get $Redis () {
    if (!this[RedisDb]) {
      this[RedisDb] = redisDb
    }
    return this[RedisDb]
  },
  // get $Mongo () {
  //   if (!this[Mongo]) {
  //     this[Mongo] = mongoDb
  //   }
  //   return this[Mongo]
  // },
  /** 发送邮件 */
  sendEmail(mailOptions: MailOptions) {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
          user: '1096482332@qq.com',
          pass: 'lwokzlzanegziceh'
        }
      });
      transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
          reject(err);
        } else {
          resolve(info);
        }
      })
    });
  },
  
  /** 有颜色打印 */
  console(content:any, color:string = 'grenn') {
    selfConsoleLog(content, color)
  }
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: any[];
  // cc?: string | null | undefined;
  // bcc?: string | null;
}
