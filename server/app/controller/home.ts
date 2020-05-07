import { Controller } from 'egg';
import * as nodemailer from 'nodemailer';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  /**
   * Category
   * @query
   * @param pageNumber-页码
   * @param pageSize-页数
   * 
   * @data
   * @param size-大小
   * @param number-数量
   * 
   * @response
   * @param name-姓名
   * @param age-年龄
   */
  public async getTest() {
    const { ctx } = this
    ctx.body = {
      code: 200,
      message: '成功',
      data: [
        {
          name: 'age',
          age: 17
        }
      ]
    }
  }
  /**
   * PostData
   * @query
   * @param file-文件
   * @param name-名字
   * 
   * @data
   * @param lang-长度
   * 
   * @response
   * @param post-文章
   * @param postId-文章id
   * @param categoryId-分类id
   */
  public async myInterface() {
    const { ctx } = this
    ctx.body = {
      code: 200,
      message: '成功',
      data: [
        {
          post: 'age',
          postId: 17,
          categoryId: 12
        }
      ]
    }
  } 

  public async sendEmail() {
    const { ctx } = this;
    let transporter = nodemailer.createTransport({
      service: 'qq',
      auth: {
        user: '1096482332@qq.com',
        pass: 'lwokzlzanegziceh'
      }
    });

    let mailOptions = {
      from: `赵秀全 <1096482332@qq.com>`,
      to: 'zhap_xquan@163.com',
      subject: '测试邮箱插件',
      html: '<h1>我是测试的插件</h1>'
    }
    transporter.sendMail(mailOptions, function(err, info){
      console.log(err);
      console.log(info);
    })
    ctx.body = {
      code: 200,
      message: '成功',
      data: [
        {
          post: 'www',
          postId: 17,
          categoryId: 12
        }
      ]
    }
  } 
}
