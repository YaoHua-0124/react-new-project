import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import TopHeader from '../../components/new-sendbox/TopHeader'
import SideMenu from '../../components/new-sendbox/SideMenu'
import RoleList from './right-manage/RoleList'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RightList from './right-manage/RightList'
import { Redirect } from 'react-router-dom'
import './NewSendBox.css'

import { Layout } from 'antd';
const { Content } = Layout;

export default class NewSendBox extends Component {
  render() {
    return (
      <Layout>
        <SideMenu/>
        <Layout className="site-layout">
          <TopHeader/>
          <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24,minHeight: 280, overflow: "auto"}}>
            <Switch>
              <Route path="/newsendbox/home" component={Home}/>
              <Route path="/newsendbox/user-manage/user-list" component={UserList}/>
              <Route path="/newsendbox/right-manage/role-list" component={RoleList}/>
              <Route path="/newsendbox/right-manage/right-list" component={RightList}/>
              <Redirect from='/newsendbox' to="/newsendbox/home"/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
