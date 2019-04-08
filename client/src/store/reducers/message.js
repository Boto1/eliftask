import { MESSAGE } from '../actions/constants'

const messageReducer = (state = '', action) => {
  switch (action.type) {
    case MESSAGE:
      return action.msg
    default:
      return state
  }
}

export default messageReducer;