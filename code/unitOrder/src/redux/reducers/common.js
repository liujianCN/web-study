import {
  CHANGE_ROUTE,
  CHANGE_LOADING,
  CHECK_LOGIN_STATUS

} from 'constants/ActionTypes';

let initState = {
  headerName: '中国联航',
  isLogin: false,
  userName: '',
  loading: false,
  location: {
    pathname: '/',
    hash: '',
    search: '',
    query: {},
    state: undefined
  }
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case CHANGE_ROUTE:
      return {
        ...state,
        location: action.location
      };
    case `RECEIVE_POSTS_${CHECK_LOGIN_STATUS}`: {
      const userName = action.data.userName;
      return {
        ...state,
        isLogin: true,
        userName
      };
    }
    default:
      return state;
  }
}