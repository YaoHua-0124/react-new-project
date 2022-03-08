import React, { Component } from 'react'
import Item from '../Item/index'
import './List.css'

export default class List extends Component {
  render() {
    return (
      <div className='list'>
        <ul>
          <Item/>
          <Item/>
          <Item/>
        </ul>
      </div>
    )
  }
}
