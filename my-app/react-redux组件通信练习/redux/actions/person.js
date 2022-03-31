/*
  该文件专门为Person组件生成action对象
*/

export function createAddPersonAction(data) {
  return {
    type:'addPerson',
    data
  }
}
// 箭头函数
// export const createSubAction = data=>({type: 'sub', data})

//异步action， 异步action一般会调用同步action，
// export const createAddAsynchAction =(data, time) =>{
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(createAddAction(data))
//     }, time)
//    }
// }