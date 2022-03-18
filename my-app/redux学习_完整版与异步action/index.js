// 引入react核心库
import React from 'react'
// 引入reactDOM
import ReactDOM from 'react-dom'
// 引入App组件
import App from './App'
import store from './redux/store'

// 渲染App到页面
ReactDOM.render(<App/>, document.getElementById('root'))
store.subscribe(() => {
  ReactDOM.render(<App/>, document.getElementById('root'))
})