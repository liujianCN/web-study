import { getRootPath } from 'utils/Common';
const {
  API,
  NODE_ENV
} = process.env;
//const NODE_ENV = process.env.NODE_ENV;
let HOST = '';
switch (API) {
  //开发
  case 'test':
    //HOST = NODE_ENV === 'development' ? 'http://236.flycua.com:8600/h5' : getRootPath(); // 236 域名
    HOST = NODE_ENV === 'development' ? 'http://238.flycua.com:8600/h5' : getRootPath(); // 238 域名
    // HOST = 'http://172.16.0.236:8280'; // 236
    //HOST = 'http://172.16.0.238:8280'; // 238
    // HOST = 'http://172.17.0.205:8280'; //黄霖杰
    // HOST = 'http://172.17.0.56:8280'; // 白志鹏
    // HOST = 'http://172.17.0.27:8180'; //张富乐
    // HOST = 'http://172.17.0.30:8180'; // 马青辉
    break;
  //打包生产
  case 'production':
    HOST = 'https://m.flycua.com/h5';
    break;
  default:
    HOST = 'http://236.flycua.com:8600/h5';
}

export default HOST ;