// 创建组件App
import React from 'react';
import Header from './component/Header/index'
import List from './component/List/index'
import Footer from './component/Footer/index'
import './App.css'

class App extends React.Component {
  state = {
    todos: [
      { id: 1, name: '吃饭', isDone: false },
      { id: 2, name: '睡觉', isDone: false },
      { id: 3, name: '看书', isDone: false },
      { id: 4, name: '写代码', isDone: false }
    ]
  }

  //添加事件到状态
  addTodoItem = (todoObj) => {
    const { todos } = this.state
    const todo = { name: todoObj, isDone: false }
    todo.id = todos.length + 1
    const newTodos = [todo, ...todos]
    this.setState({ todos: newTodos })
  }

  // 删除某一行事项
  deleteTodoItem = (id) => {
    const { todos } = this.state
    todos.splice(todos.findIndex((item) => { return item.id === id }), 1)
    this.setState({ todos: todos })
  }

  // 删除已选中的事项
  deleteSelectd = (completedItem) => {
    const { todos } = this.state
    for (let i = 0; i < completedItem.length; i++) {
      todos.splice(todos.findIndex((item) => { return item.id === completedItem[i].id }), 1)
    }
    this.setState({ todos: todos })
  }

  // 更改事项的完成状态
  changeCheck = (id, isDone) => {
    const { todos } = this.state
    let updatedTodos = todos.map((item) => {
      if (id === item.id) return { ...item, isDone }
      return item;
    })
    this.setState({ todos: updatedTodos })
  }

  //选中所有事项
  selectdeAll = (isSelectAll) => {
    const { todos } = this.state
    let updatedTodos = todos.map((item) => {
      return { ...item, isDone:isSelectAll }
    })
    this.setState({ todos: updatedTodos })
  }

  render() {
    return (
      <div className='container'>
        <Header addTodoItem={this.addTodoItem} />
        <List todos={this.state.todos} deleteTodoItem={this.deleteTodoItem} changeCheck={this.changeCheck} />
        <Footer todos={this.state.todos} deleteSelectd={this.deleteSelectd} selectdeAll={this.selectdeAll} />
      </div>
    )
  }
}

export default App
