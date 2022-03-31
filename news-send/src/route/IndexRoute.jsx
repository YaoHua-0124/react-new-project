import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Route,Switch} from 'react-router-dom'
import Login from '../view/login/Login'
import NewSendBox from '../view/new-sendbox/NewSendBox'

// 路由组件，管理页面中的所有路由
export default class IndexRoute extends Component {
  render() {
    return (
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/newsendbox" render={() => localStorage.getItem("name")?<NewSendBox/>:<Redirect to='login'/>}/>
          <Redirect from='/' to='/newsendbox'/>
        </Switch>
    )
  }
}
