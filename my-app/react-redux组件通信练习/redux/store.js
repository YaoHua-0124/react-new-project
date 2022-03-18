// 引入createStore， 专门用于创建redux中的store对象
import {createStore, applyMiddleware} from 'redux'
// 引入为Count组件服务的reducer
import reducer from './reducers/index'

// 引入redux-thunk 用于支持异步action
import thunk from 'redux-thunk'
// 暴露store
export default createStore(reducer, applyMiddleware(thunk))