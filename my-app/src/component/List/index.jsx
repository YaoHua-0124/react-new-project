import React, { Component } from 'react'
import Item from '../Item/index'
import './List.css'

export default class List extends Component {
  render() {
    const { todos, deleteTodoItem, changeCheck } = this.props;
    return (
      <div className='list'>
        <ul>
          {
            todos.map((todo) => {
              return <Item key={todo.id} {...todo} deleteTodoItem={deleteTodoItem} changeCheck={changeCheck} />
            })
          }
        </ul>
      </div>
    )
  }
}
