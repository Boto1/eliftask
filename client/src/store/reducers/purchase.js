import { GET_PURCHASES } from '../actions/constants'

const purchaseReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PURCHASES:
      return action.payload
    default:
      return state
  }
}

export default purchaseReducer;