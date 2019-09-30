const initialState = {
  headerTitle: '大兴',
  loading:'h',
  counter:0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'TEST_SAGA':
      return {
        ...state,
        headerTitle:action.payload
      }
    case 'TEST_REDUX':
      return {
        ...state,
        loading:action.payload
      }
    case 'TEST_SAGA_COUNTER':
      return {
        ...state,
        counter: action.payload
      }
    default:
      return state
  }
}
export default reducer