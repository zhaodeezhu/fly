import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1569143841677_7459';
  
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  // add your egg config in here
  config.middleware = ['response'];

  config.cluster = {
    listen: {
      path: '',
      port: 5555,
      hostname: '127.0.0.1',
    }
  };

  config.mongo = {
    client: {
      host:"127.0.0.1",
      port:"27017",
      name:"flyleaf",
      user:"",
      password:"",
      options:{},
    }
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
