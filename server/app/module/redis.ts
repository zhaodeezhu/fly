const redis = require('redis')
const ConfigRedis = require('./config').redis
const selfConsoless = require('./console')
class Redis {
    static instance:any = null;
    dbnet:any = '';
    constructor () {
        this.dbnet = ''
        this.redisConnect()
        // 重写Object对象中的toString方法
        // Object.prototype.toString = function(){
        //     return JSON.stringify(this);
        // }
    }
    // 实现单例
    static getInstance () {
        if (!Redis.instance) {
            Redis.instance = new Redis()
        }
        return Redis.instance
    }
    redisConnect () {
        if (!this.dbnet) {
            const connection = redis.createClient(ConfigRedis.port, ConfigRedis.host)
            connection.on('connect', () => {
                selfConsoless('> Redis connected', 'green')
                this.dbnet = connection
            })
            connection.on('error', (error) => {
                console.log(error)
            })
        }
    }
    // 设置数据
    setRedisString (key, data, time) {
        this.dbnet.set(key, data, redis.print)
        if (time) {
            this.dbnet.expire(key, time)
        }
    }
    // 获取数据
    getRedisString (key) {
        return new Promise((resolve, reject) => {
            this.dbnet.get(key, (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}
module.exports = Redis.getInstance()
