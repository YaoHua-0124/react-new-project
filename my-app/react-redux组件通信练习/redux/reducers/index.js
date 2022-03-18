import { combineReducers } from 'redux'
import countReducer from './count_reducer'
import personinfo from './person'

export default combineReducers({
  countReducer: countReducer,
  personinfo: personinfo
})