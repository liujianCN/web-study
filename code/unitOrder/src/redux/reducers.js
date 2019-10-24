import { combineReducers } from 'redux';

import common from './reducers/common';
import ticketOrder from './reducers/ticketOrder';

export default combineReducers({
    common,
    ticketOrder
});