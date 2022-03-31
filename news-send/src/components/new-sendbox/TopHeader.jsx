import React, { useState } from 'react'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;


export default function TopHeader() {
  const [collapsed,setCollapsed] = useState({collapsed:false})
  const changeIcon = () => {
    setCollapsed(!collapsed)
  }

  // toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };

  return (
    <Header className="site-layout-background" style={{ padding: '16px' }}>
      { 
        collapsed ? <MenuUnfoldOutlined onClick={changeIcon}/> : <MenuFoldOutlined onClick={changeIcon}/>
      }
    </Header>
  ) 
}
