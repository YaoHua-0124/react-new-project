import React, { Component } from 'react'
import './Item.css'

export default class Item extends Component {
  state = {
    display: false
  }
  shoubtn = () => {
    this.setState({display: true})
  }
  hiddenBtn = () => {
    this.setState({display: false})
  }
  deleteItem = () => {
    console.log('删除删除');
  }
  render() {
    const display = {
      display: this.state.display? 'block':'none'
    };
    return (
      <div className='item'>
          <li onMouseOver={this.shoubtn} onMouseLeave={this.hiddenBtn}>
            <input type="checkbox" name="select" className='checkbox'/>
            <span>你好</span>
            <button style={display} onClick={this.deleteItem}>删除</button>
          </li>
      </div>
    )
  }
}
