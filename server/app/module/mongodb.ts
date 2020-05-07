const mongoose = require('mongoose');
const mongoConfig = require('./config').mongo;

class MongoDb {
  static instance:any = null;
  dbnet:any = '';
  constructor() {
    this.dbconnect()
  }
  //实现单例模式
  static getInstance() {
    if (!MongoDb.instance) {
      MongoDb.instance = new MongoDb();
    }
    return MongoDb.instance;
  }
  /** 连接 */
  dbconnect() {
    console.log('mongodb connect')
    let dbnet = mongoose.connect('127.0.0.1','flyleaf', 27017);
    dbnet.on('error', console.error.bind(console, '连接错误:'));
    this.dbnet = dbnet
    console.log('mongodb connect')
  }
}

module.exports = MongoDb.getInstance()