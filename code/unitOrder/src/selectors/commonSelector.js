import { createSelector } from 'reselect';

// 获取loading状态
export const getLoadingStatus = state => state.common.loading;
// 获取标题状态
export const getHeaderName = state => state.common.headerName;
// 获取当前location
export const getLocation = state => state.common.location;
// 是否登陆
export const getIsLogin= state => state.common.isLogin;
// 获取当前用户名
export const getUserName = state => state.common.userName;

/**
 * @description: 获取当前路由的简要信息pathName值 /login 要转换为 login
 * @param {Object} state
 * @return: 路由/后面的参数
 */
export const getPathName = createSelector(
  getLocation,
  (location) => {
    if (!location) return '404';
    let {
        pathname
    } = location;
    return (pathname.length > 1 && pathname.slice(0,1) == '/')
      ? pathname.slice(1)
      : 'home';
  }
);

//得出路由后面的参数
export const getQuery = createSelector(
  getLocation,
  (location) => {
    // return location.query || {}
    if(location.query && Object.keys(location.query).length>0){
      return location.query;
    }else if(location.search && location.search.indexOf('?')!==-1) {
      let theRequest = {};
      let str = location.search.substr(1);
      let strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
      }
      return theRequest;
    }
    return {};
  }
);