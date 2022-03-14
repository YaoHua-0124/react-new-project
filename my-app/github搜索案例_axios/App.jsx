import React, { Component} from 'react';
import Search from './compontents/Search/index'
import List from './compontents/List/index'

export default class App extends Component {
  state = {
    userInfo: []
  }
  saveUserInfo = (users) => {
    this.setState(
      {userInfo: users}
    )
  }
  render(){
    return(
      <div className="container">
        <Search saveUserInfo = {this.saveUserInfo}/>
        <List usersInfo={this.state.userInfo}/>
      </div>
    )
  }
}