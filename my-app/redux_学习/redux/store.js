// 引入createStore， 专门用于创建redux中的store对象
import {createStore} from 'redux'
// 引入为Count组件服务的reducer
import countReducer from './count_reducer'
// 暴露store
export default createStore(countReducer)