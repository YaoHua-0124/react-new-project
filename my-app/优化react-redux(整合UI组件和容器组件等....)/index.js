// 引入react核心库
import React from 'react'
// 引入reactDOM
import ReactDOM from 'react-dom'
// 引入App组件
import App from './App'
import store from './redux/store'

// Provider监测应用中的容器组件，并将store传递给容器组件
import {Provider} from 'react-redux'

// 渲染App到页面
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('root'))