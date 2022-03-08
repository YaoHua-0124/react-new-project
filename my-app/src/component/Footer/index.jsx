import React, { Component } from 'react'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <input className='checkbox' name="selectAll" type="checkbox"/>
        <span className='showInfo'>已完成0 / 全部4</span>
      </div>
    )
  }
}
