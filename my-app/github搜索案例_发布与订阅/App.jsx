import React, { Component} from 'react';
import Search from './compontents/Search/index'
import List from './compontents/List/index'

export default class App extends Component {
  render(){
    return(
      <div className="container">
        <Search/>
        <List/>
      </div>
    )
  }
}