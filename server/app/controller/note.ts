import { Controller } from 'egg';

export default class NoteController extends Controller {
  public async insert () {
    let {ctx, service} = this;
    let url = ctx.request.body.url;
    let userId = ctx.request.body.userId;
    let params = ctx.request.body.params;
    let querys = ctx.request.body.querys;
    let data = ctx.request.body.data;
    let resTime = ctx.request.body.resTime;
    let responseText = ctx.request.body.responseText;

    let res = await service.note.insert(ctx.request.body);

    ctx.state.data = {
      code: 200,
      data: [],
      message: '记录成功'
    }
  }

  public async getData() {
    let {ctx, service} = this;
    // let res = await service.note.getData();
    let monData = await this.app['mongo'].find('api_note')

    ctx.state.data = {
      code: 200,
      data: monData,
      message: '成功'
    }
  }
}