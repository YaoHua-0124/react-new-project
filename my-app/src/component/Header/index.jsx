import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {

  //获取新的事项
  getNewTodo = (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim() === '') {
      alert('请输入您需要处理的事件！')
      return;
    }
    const { addTodoItem } = this.props
    // 将新事项传给App组件
    addTodoItem(event.target.value)
    // 回车之后清空输入框
    event.target.value = ''
  }
  render() {
    return (
      <div>
        <input onKeyUp={this.getNewTodo} className='header' type="text" placeholder='请输入你的任务名称，按回车键确认' />
      </div>
    )
  }
}
