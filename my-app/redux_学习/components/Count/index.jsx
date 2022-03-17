import React, { Component } from 'react'
// import countReducer from '../../redux/count_reducer'
// import store form ''
import store from '../../redux/store'

export default class Count extends Component {

  componentDidMount(){
    store.subscribe(() => {
      this.setState({})
    })
  }

  add = () => {
    const {value} = this.selectNum
    store.dispatch({type:'add',data:value*1})
  }

  sub = () => {
    const {value} = this.selectNum
    store.dispatch({type:'sub',data:value*1})
  }

  oddNumAdd = () => {
    const count = store.getState()
    if(count%2 !== 0){
      const {value} = this.selectNum
      store.dispatch({type:'add',data:value*1})
    }
  }

  asynch = () => {
    setInterval(() => { 
      const {value} = this.selectNum
      store.dispatch({type:'add',data:value*1})
     },1000)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{store.getState()}</h1>
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
