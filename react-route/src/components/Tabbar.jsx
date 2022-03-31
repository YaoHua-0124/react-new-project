import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './css/Tabbar.css'

export default class Tabbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><NavLink to='/films' activeClassName='activeClick'>电影</NavLink></li>
          <li><NavLink to='/cinemas' activeClassName='activeClick'>影院</NavLink></li>
          <li><NavLink to='/center' activeClassName='activeClick'>我的</NavLink></li>
        </ul>
      </div>
    )
  }
}
