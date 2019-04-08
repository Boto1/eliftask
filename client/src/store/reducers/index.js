import { combineReducers } from 'redux'
import purchaseReducer from './purchase'
import messageReducer from './message'

export default combineReducers({
  purchases: purchaseReducer,
  msg: messageReducer
})
