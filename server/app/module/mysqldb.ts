const mysql = require('mysql');
const Config = require('./config').mysql;
const selfConsoles = require('./console')

class MysqlDB {
    static instance:any = null;
    dbnet:any = ''
    constructor() {
        this.dbnet = '';
        this.dbconnect();
    }

    //实现单例模式
    static getInstance() {
        if (!MysqlDB.instance) {
            MysqlDB.instance = new MysqlDB();
        }
        return MysqlDB.instance;
    }

    //连接数据库
    dbconnect() {
        let _that = this;
        return new Promise((resolve, reject) => {
            if (!_that.dbnet) {
                //创建连接
                const connection = mysql.createConnection(Config);
                //开始连接
                connection.connect((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        _that.dbnet = connection
                        selfConsoles('> mysql connected', 'green')
                        resolve(_that.dbnet);
                    }
                })
            } else {
                resolve(_that.dbnet);
            }
        })
    }

    //查询数据库
    dbquery(sql) {
        return new Promise((resolve, reject) => {
            this.dbconnect()
                .then((dbcon: any) => {
                    dbcon.query(sql, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            let json = JSON.parse(JSON.stringify(data));
                            resolve(json);
                        }
                    })
                })
        })
    }

    //查询所有数据
    selectAll(sql) {
        return new Promise((resolve, reject) => {
            this.dbconnect()
                .then((dbcon:any) => {
                    dbcon.query(sql, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            let json = JSON.parse(JSON.stringify(data));
                            // let json = data;
                            resolve(json);
                        }
                    })
                })
        })
    }

    //查询一条数据
    selectOne(sql) {
        return new Promise((resolve, reject) => {
            this.dbconnect()
                .then((dbcon:any) => {
                    dbcon.query(sql, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            // let json = JSON.parse(JSON.stringify(data))[0];
                            let json = data
                            resolve(json);
                        }
                    })
                })
        })
    }

    //更新数据
    affectedRows(sql) {
        return new Promise((resolve, reject) => {
            this.dbconnect()
                .then((dbcon:any) => {
                    dbcon.query(sql, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            let rows = JSON.parse(JSON.stringify(data)).affectedRows;
                            resolve(rows);
                        }
                    })
                })
        })
    }

    // 批量更新数据
    updateBatch(allData, tableNmae) {
        return new Promise((resolve, reject) => {
            this.dbconnect()
                .then((dbcon:any) => {
                    // 处理id
                    let ids = ''
                    let idsArr:any[] = []
                    let arr:any[] = []
                    let sql = ''
                    allData.forEach((item, i) => {
                        if (i === 0) {
                            ids = item.id
                        } else {
                            ids += ',' + item.id
                        }
                        idsArr.push(item.id)
                    })
                    // 处理数据格式
                    Object.keys(allData[0]).forEach((key, i) => {
                        if (key === 'id') return false
                        let middleArr:any[] = []
                        middleArr.push(key)
                        allData.forEach(item => {
                            middleArr.push(item[key])
                        })
                        arr.push(middleArr)
                    })

                    // 处理sql
                    arr.forEach((item, i) => {
                        if (i === 0) {
                            sql += `update ${tableNmae}
                                set ${item[0]} = case id`
                            item.forEach((word, index) => {
                                if (index === 0) return false
                                sql += ` when ${idsArr[index - 1]} then '${word}'`
                            })
                            sql += ` end`
                        } else {
                            sql += `,${item[0]} = case id`
                            item.forEach((word, index) => {
                                if (index === 0) return false
                                sql += ` when ${idsArr[index - 1]} then '${word}'`
                            })
                            sql += ` end`
                        }
                    })
                    sql += ` where id in(${ids})`
                    dbcon.query(sql, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            let rows = JSON.parse(JSON.stringify(data)).affectedRows;
                            resolve(rows);
                        }
                    })
                })
        })
    }

}

module.exports = MysqlDB.getInstance();
