module.exports = {
    port: '8000',
    host: '127.0.0.1',
    // host: '192.168.1.235',
    domain: 'https://www.langshow.xyz:5050',
    // domain: 'http://127.0.0.1',
    mysql: {
        host:'cdb-axjbvdxf.gz.tencentcdb.com',
        // host:'127.0.0.1',
        user:'root',
        password:'cover123ZHAO',
        // password:'123456',
        database:'flyleaf',
        // port:'3306',
        port:'10042',
        useConnectionPooling: true
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    mongo: {
        host: '127.0.0.1',
        port: 27017,
        database: 'flyleaf'
    }
}
