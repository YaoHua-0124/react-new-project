import React, { Component } from 'react'

export default class Count extends Component {

  add = () => {
    const {value} = this.selectNum
    this.props.add(value*1)
  }

  sub = () => {
    const {value} = this.selectNum
    this.props.sub(value*1)
  }

  oddNumAdd = () => {
    if(this.props.count % 2 !== 0){
      const {value} = this.selectNum
      this.props.add(value*1)
    }
  }

  asynch = () => {
    const {value} = this.selectNum
    this.props.async(value*1)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{this.props.count}</h1>
        <select ref={(currentNode) => {this.selectNum= currentNode}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;<button onClick={this.add}>+</button>
        &nbsp;<button onClick={this.sub}>-</button>
        &nbsp;<button onClick={this.oddNumAdd}>当前求和为奇数时再加</button>
        &nbsp;<button onClick={this.asynch}>异步加</button>
      </div>
    )
  }
}
