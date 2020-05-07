import { Service } from 'egg';
export default class Note extends Service {
  public async insert(params) {
    let {app} = this;
    // console.log(btf);
    // let ab = new ArrayBuffer(btf.length);
    // let view = new Uint8Array(ab);
    // for (var i = 0; i < btf.length; ++i) {
    //     view[i] = btf[i];
    // }
    // let insertSql = `insert into fly_api_note(url, userId, params, querys, data, resTime, responseText) 
    //   values('${params.url}', 1, '${params.params}', '${params.querys}', '${params.data}', ${params.resTime}, '${btf}')`;
    // let data = app.$Sql.affectedRows(insertSql);
    let data = await app['mongo'].insertOne('api_note', {
      doc: params
    })
    return data;
  }

  public async getData() {
    let {app} = this;
    let getSql = 'select * from fly_api_note where id = 62';

    let data = app.$Sql.selectOne(getSql);
    return data;
  }
}