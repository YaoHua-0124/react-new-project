import React, { Component } from 'react'
import './Item.css'

export default class Item extends Component {
  state = {
    display: false
  }

  // 显示按钮
  showbtn = () => {
    this.setState({ display: true })
  }

  // 隐藏按钮
  hiddenBtn = () => {
    this.setState({ display: false })
  }

  // 删除某一项
  deleteItem = () => {
    this.props.deleteTodoItem(this.props.id)
  }

  // 更改事项的选中状态
  changeCheck = (event) => {
    this.props.changeCheck(this.props.id, event.target.checked)
  }
  render() {
    const { name, isDone } = this.props
    return (
      <div className='item'>
        <li onMouseOver={this.showbtn} onMouseLeave={this.hiddenBtn}>
          <input type="checkbox" name="select" className='checkbox' checked={isDone} onChange={this.changeCheck} />
          <span>{name}</span>
          <button style={{ display: this.state.display ? 'block' : 'none' }} onClick={this.deleteItem}>删除</button>
        </li>
      </div>
    )
  }
}
