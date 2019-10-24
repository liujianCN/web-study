import axios from 'axios';
import HOST from 'CONF';

axios.defaults.baseURL = HOST;
axios.defaults.withCredentials = true;
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 18000;

const CancelToken = axios.CancelToken;
let cancel;


/**
 * loading拦截
 * @param url 当前请求路径
 * @return loadingSetting true 则不加载 false 加载
 */
//function loadingIntercept (url) {
//  // console.log(store.getters.getPath);
//  //取得当前页面是否匹配拦截 空数组则没找到。
//  let PathList = [].filter(item => item === store.getters.getPath);
//  // console.log('store');
//  // console.log(store.getState());
//  //取得当前请求路径是否匹配loading拦截，空数组则没找到
//  let reqUrlList = [].filter(item => url.indexOf(item) !== -1);
//  // console.log(reqUrlList);
//  //取得当前请求路径是否匹配loading拦截，需特殊处理的url
//  let commonReqUrlList = ['checkLoginStatus', 'sendMobileRandomCode',
//    'verifyPayment'
//  ].filter(item => url.indexOf(item) !== -1);
//  //只有两个都匹配，则不加载loading 或者 commonReqUrlList 特殊处理路径匹配 则也不加载
//  return (PathList.length > 0 && reqUrlList.length > 0) ||
//    commonReqUrlList.length > 0;
//}
// /**
//  * request之前的处理
//  */
// axios.interceptors.request.use(function (config) {
//    //console.log('reqConfig');
//    //console.log(config);
//   let loadingSetting = loadingIntercept(config.url);
//   if (!loadingSetting) {
//     store.dispatch(action_comm_changeLoading(true));
//   }
//   return config;
// }, function (err) {
//   store.dispatch(action_comm_changeLoading(false));
//   return Promise.reject(err);
// });

// /**
//  * response之后的处理
//  */
// axios.interceptors.response.use(function (response) {
//    //console.log('response-------->');
//    //console.log(response);
//   let loadingSetting = loadingIntercept(response.config.url);
//   if (!loadingSetting) {
//     store.dispatch(action_comm_changeLoading(false));
//   }
//   return response;
// }, function (err) {
//   store.dispatch(action_comm_changeLoading(false));

//   return Promise.resolve({
//     data: {
//       err,
//       commonRes: {
//         isOk: false,
//         code: err.response ? err.response.status : 'error',
//         message: err.message
//       }
//     }
//   });
// });

//get请求
function get (url) {
  return body => axios.get(url, body);
}

//post请求
function post (url, p) {
  return axios.post(url, p, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
}

export {
  axios,
  get,
  post,
  cancel
};