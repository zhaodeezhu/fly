import { Controller } from 'egg';
import {renderToString} from 'react-dom/server'
import getAsps from '../components/Test';
const exec = require('child_process').exec;
export default class CommunicationController extends Controller {
  /**
   * SimpleEmail
   */
  public async sendSimpleEmail() {
    const {ctx, app} = this;
    let {
      nickName, 
      acceptEmail, 
      sendEmail, 
      sendCode, 
      subject, 
      content, 
      attachments, 
      cc, 
      bcc
    } = ctx.request.body;
    if(!acceptEmail || !subject || !content || !nickName) {
      ctx.state.data = {
        code: 201,
        data: [],
        message: '缺少必要参数'
      }
    }
    const EmailHtml = renderToString(getAsps(content));
    /** 发送有奖配置 */
    const mailOptions = {
      from: `${nickName} <1096482332@qq.com>`,
      to: acceptEmail,
      subject: subject,
      // html: content,
      html: EmailHtml,
      attachments: attachments || [],
      cc: cc || '',
      bcc: bcc || ''
    };
    let res: any =  await app.sendEmail(mailOptions);

    ctx.state.data = {
      code: 200,
      data: [],
      message: res
    }
  }

  /**
   * 自动部署前端项目
   */
  public async autoListenerWebhook() {
    const {ctx, app} = this;

    // console.log(ctx.request.body)
    const repository = ctx.request.body.repository;
    const pusher = ctx.request.body.pusher;
    const commits = ctx.request.body.commits;
    const url = '/Users/cvtezxq/zhaodeezhu/project/flyleaf'
    let res = await ctx.curl('http://127.0.0.1:1111/api/communication/sendSimpleEmail', {
      method: 'POST',
      data: {
        nickName: '系统通知',
        acceptEmail: 'zhao_xquan@163.com',
        subject: '推送代码通知',
        content: repository.url
      }
    })

    process.chdir(url);

    // childProcess('git status', (err, res, stderr) => {
    //   console.log(res)
    // })
    app.console('execute git pull');
    const prog = exec('git pull', {}, (err) => {
      if(err) {
        console.log(err);
      } else {
        app.console('git pull successful');
        app.console('execute cnpm i');
        const prog = exec('cnpm i', (err) => {
          if(err) {
            console.log(err);
          } else {
            app.console('cnpm i successful');
            const prog = exec('npm run build', (err) => {
              if(err) {
                console.log(err);
              } else {
                app.console('build successful');
              }
            })
            prog.stdout.on('data', data => {
              console.log(data);
            })
            prog.stderr.on('data', function (data) {
              console.log(data);
            });
          }
        })
        prog.stdout.on('data', data => {
          console.log(data);
        })
        prog.stderr.on('data', function (data) {
          console.log(data);
        });
      }
    });
    prog.stdout.on('data', data => {
      console.log(data);
    })
    prog.stderr.on('data', function (data) {
      console.log(data);
    });
    ctx.state.data = {
      data: [],
      code: 200,
      message: '成功'
    }
  }
}