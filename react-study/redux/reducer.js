const initialState = {
  count: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1
      }
    case 'SUB':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}