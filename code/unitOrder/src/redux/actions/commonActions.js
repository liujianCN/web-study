import {
  CHANGE_ROUTE,
  CHANGE_LOADING,
  UPDATE_HEADERNAME
} from 'constants/ActionTypes';

//路由变化
export const action_comm_changeLocation = (location) => ({
  type: CHANGE_ROUTE, location
});

//loading变化
export const action_comm_changeLoading = (loading) => ({
  type: CHANGE_LOADING, loading
});

//headerTitle变化
export const action_comm_changeHeaderName = (title) => ({
  type: UPDATE_HEADERNAME, title
});

//存储请求的数据到store
export const action_comm_saveDataToStore = (type, data) => ({
  type: `RECEIVE_POSTS_${type}`, data
});

//请求失败的情况
export const action_comm_fetchError = (err) => ({
  type: 'FETCH_ERROR', err
});