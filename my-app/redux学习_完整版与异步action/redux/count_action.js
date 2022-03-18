/*
  该文件专门为Count组件生成action对象
*/

// import store from "./store"

export function createAddAction(data) {
  return {
    type:'add',
    data
  }
}
// 箭头函数
export const createSubAction = data=>({type: 'sub', data})

//异步action， 异步action一般会调用同步action，
export const createAddAsynchAction =(data, time) =>{
  return () => {
    setTimeout((dispatch) => {
      dispatch(createAddAction(data))
    }, time)
   }
}