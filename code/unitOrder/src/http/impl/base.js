import { post } from '../axios';
import {
  checkLoginStatusURL,
  getSignVarifyCodeURL,
  authRandomPasswordURL
} from '../api';

//登录状态
export const checkLoginStatus = params => {
    return post(checkLoginStatusURL, params);
};

//会员登录获取验证码
export const getSignVarifyCode = (params) =>{
    return post(getSignVarifyCodeURL,params);
};

//会员验证码登录
export const authRandomPassword = (params) =>{
    return post(authRandomPasswordURL,params);
};