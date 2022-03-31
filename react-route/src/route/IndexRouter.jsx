import React, { Component } from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import Films from '../view/Films'
import Cinemas from '../view/Cinemas'
import Center from '../view/Center'
import NotFound from '../view/NotFound'
import Detail from '../view/Films/Detail'


// 专门用于存放路由的组件
export default class IndexRouter extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/films" component={Films}/>
          <Route path="/cinemas" component={Cinemas}/>
          <Route path="/center" component={Center}/>

          {/* 动态路由：:/xxxx    */}
          <Route path={"/detail/:flimID"} component={Detail}/>
          <Redirect from="/" to="/films" exact />{/** 重定向，用于网站首页的展示，即当用户首次访问网站时展现的页面 */}
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}
