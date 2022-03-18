// 引入count的UI组件
import CountUI from "../../components/Count";
import { createAddAction,
         createSubAction,
         createAddAsynchAction } from "../../redux/count_action";
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

/* 
    connect(mapStateToProps, mapDispatchToProps)方法在调用时会传入两个参数
      mapStateToProps:  该参数为一个函数，返回值是对象
          对象的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value --- 状态
          在调用该函数时，会传入store的state

      mapDispatchToProps:  该参数为一个函数，返回值是对象（注意：该对象时一个函数！！！）
          对象的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value --- 操作状态的方法
          在调用该函数时，会自动传入dispatch方法
*/

const mapStateToProps = (state) => {
  return {count: state}
}
const mapDispatchToProps = (dispatch) => {
  return {
    add: data => dispatch(createAddAction(data)),
    sub: data => dispatch(createSubAction(data)),
    async: data => dispatch(createAddAsynchAction(data, 1000))
  }
 }




// 使用connect()() 创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)