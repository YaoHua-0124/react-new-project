import React,{useEffect, useState} from 'react'
import { Layout, Menu } from 'antd';
import {
  SettingOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './css/SideMenu.css'

const { Sider } = Layout;
const { SubMenu } = Menu;

// const menuList = [
//   {
//     key: '/newsendbox/home',
//     title: '首页',
//     icon: <SettingOutlined />,
//   },
//   {
//     key: '/newsendbox/user-manage',
//     title: '用户管理',
//     icon: <SettingOutlined />,
//     children: [
//       {
//         key: '/newsendbox/user-manage/user-list',
//         title: '用户列表'
//       }
//     ]
//   },
//   {
//     key: '/newsendbox/right-manage',
//     title: '权限管理',
//     icon: <SettingOutlined />,
//     children: [
//       {
//         key: '/newsendbox/right-manage/role-list',
//         title: '角色列表'
//       },
//       {
//         key: '/newsendbox/right-manage/right-list',
//         title: '权限列表'
//       }
//     ]
//   }
// ]

const iconList = {
  "/newsendbox/home": <SettingOutlined/>,
  "/newsendbox/user-manage": <SettingOutlined/>,
  "/newsendbox/right-manage": <SettingOutlined/>,
}

function SideMenu(props) {
  const [meun, setMenu] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/rights?_embed=children").then(res => {
      setMenu(res.data)
    })
  },[])
  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if(item.children?.length && item.pagepermisson){
        return <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                  { renderMenu(item.children) }
               </SubMenu>
      }
      return item.pagepermisson && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  const selectPath = [props.location.pathname];
  const pathList = props.location.pathname.split("/")
  const openPath =["/"+pathList[1]+"/"+pathList[2]];
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{display: "flex", height: "100%", "flexDirection":"column"}}>
        <div className="logo">全球新闻发布系统</div>
        <div style={{flex:1, "overflow": "auto"}}>
          <Menu theme="dark" mode="inline" selectedKeys={selectPath} defaultOpenKeys={openPath}>
            {
              // menuList.map((item) => {
              //   if(item.children){
              //     return <SubMenu key={item.key} icon={item.icon} title={item.title}>
              //               {item.children.map((child) => {
              //                 return <Menu.Item key={child.key}>{child.title}</Menu.Item>
              //               })}
              //            </SubMenu>
              //   }
              //   return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>
              // })
              renderMenu(meun)
            }
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
export default withRouter(SideMenu)