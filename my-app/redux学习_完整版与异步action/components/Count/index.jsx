import React, { Component } from 'react'
// import countReducer from '../../redux/count_reducer'
// 引入store 用于获取redux中保存的状态
import store from '../../redux/store'

//引入actionCreator， 专门用于创建action对象
import {createAddAction,
        createSubAction,
        createAddAsynchAction} from '../../redux/count_action'

export default class Count extends Component {

  /* 
  直接在根目录的index文件中监听store状态的变化
  componentDidMount(){
    store.subscribe(() => {
      this.setState({})
    })
  } */

  add = () => {
    const {value} = this.selectNum
    store.dispatch(createAddAction(value*1))
  }

  sub = () => {
    const {value} = this.selectNum
    store.dispatch(createSubAction(value*1))
  }

  oddNumAdd = () => {
    const count = store.getState()
    if(count%2 !== 0){
      const {value} = this.selectNum
      store.dispatch(createAddAction(value*1))
    }
  }

  asynch = () => {
    const {value} = this.selectNum
    store.dispatch(createAddAsynchAction(value*1, 1000))
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
