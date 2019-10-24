/* eslint-disable no-unused-vars */
import { createHashHistory } from 'history';
import store from 'store';

import { action_comm_changeLocation } from 'actions/commonActions';

const history = createHashHistory();


// // Listen for changes to the current location.
// const unlisten = history.listen((location, action) => {
// });

export default history;