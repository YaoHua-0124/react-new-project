import { createAddAction,
         createSubAction,
         createAddAsynchAction } from "../../redux/count_action";
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

import React, { Component } from 'react'


// 定义UI组件
class Count extends Component {

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
    this.props.async(value*1, 1000)
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

/* 
    connect(mapStateToProps, mapDispatchToProps)方法在调用时会传入两个参数
      mapStateToProps:  该参数为一个函数，返回值是对象
          对象的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value --- 状态
          在调用该函数时，会传入store的state

      mapDispatchToProps:  该参数为一个函数，返回值是对象（注意：该对象时一个函数！！！）
          对象的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value --- 操作状态的方法
          在调用该函数时，会自动传入dispatch方法
*/

// const mapStateToProps = (state) => {
//   return {count: state}
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     add: data => dispatch(createAddAction(data)),
//     sub: data => dispatch(createSubAction(data)),
//     async: data => dispatch(createAddAsynchAction(data, 1000))
//   }
//  }




// 使用connect()() 创建并暴露一个Count的容器组件
export default connect(
  state => ({count: state}),
  // mapDispatchToProps的精简写法
  {
    add: createAddAction,
    sub: createSubAction,
    async: createAddAsynchAction
  }
  /* 
  mapDispatchToProps的一般写法
  dispatch => ({
      add: data => dispatch(createAddAction(data)),
      sub: data => dispatch(createSubAction(data)),
      async: data => dispatch(createAddAsynchAction(data, 1000))
    }) 
  */
  )(Count)
