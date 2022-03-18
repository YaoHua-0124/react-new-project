/* 
  该文件是用于创建一个专门为Person组件服务的reducer，其本质就是一个函数
*/


/**
 * 
 * @param preState 之前的状态
 * @param action 动作对象
 */
 export default function personinfo(preState, action){
  if (preState === undefined) preState = []
  const {type, data} = action
  switch (type) {
    case 'add':
      return [data, ...preState]
    default:
      return preState
  }
}