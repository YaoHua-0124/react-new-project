import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {

  // 选中所有的事项
  selectdeAll = (event) => {
    this.props.selectdeAll(event.target.checked)
  }

  // 删除选中的事项
  deleteSelectd = (completedItem) => {
    return () => {
      this.props.deleteSelectd(completedItem)
    }
  }

  render() {
    const { todos } = this.props
    let completedItem = []
    for (let index = 0; index < todos.length; index++) {
      if (todos[index].isDone === true) completedItem.push(todos[index])
    }
    let isAllSelected = todos.length === completedItem.length &&  todos.length!==0 ? true : false
    return (
      <div className='footer'>
        <input type="checkbox" checked={isAllSelected} onChange={this.selectdeAll} className='checkbox' name="selectAll" />
        <span className='showInfo'>已完成{completedItem.length} / 全部{todos.length}</span>
        <button style={{ display: completedItem.length ? 'block' : 'none' }} onClick={this.deleteSelectd(completedItem)}>清除已完成任务</button>
      </div>
    )
  }
}
