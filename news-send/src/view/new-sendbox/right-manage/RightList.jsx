import React, { useEffect, useState } from 'react'
import {Table, Tag, Button, Popconfirm, Popover, Switch} from 'antd'
import axios from 'axios'
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';

export default function RightList() {

  const [rightList, setrightList] = useState([])

  const getList = () => {
    axios.get("http://localhost:8000/rights?_embed=children").then( res => {
      const list = res.data
      list.forEach( (item,index) => {
        if(!item.children.length) list[index].children = ""
      });
      setrightList(list)
    })
  }
  useEffect( () => {
    getList()
  }, [])

  const delectRight = (item) => {
    return () => {
      if(item.grade !== 1){
        // let list = rightList.filter( data => data.id === item.rightId )
        // list[0].children = list[0].children.filter(data => data.id!==item.id)
        // setrightList([...rightList])
        axios.delete(`http://localhost:8000/children/${item.id}`).then(() => {
          getList()
        })
      } else {
        setrightList(rightList.filter(data => data.id!==item.id))
        axios.delete(`http://localhost:8000/rights/${item.id}`).then(() => {

        })
      }
    }
  }
  const changeSwitch = (item) => {
    item.pagepermisson = item.pagepermisson? 0:1
    setrightList([...rightList])
    if(item.grade === 1){
      axios.patch(`http://localhost:8000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`http://localhost:8000/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Popover content={ <div style={{textAlign:"center"}}>
                            <Switch checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked
                                    checked={item.pagepermisson}
                                    onClick={() => changeSwitch(item) }/></div>}
                   title="权限开关" trigger={item.pagepermisson !== undefined?'click':''}>
            <Button  disabled={item.pagepermisson === undefined} title="编辑权限" type="primary" shape="circle" icon={<EditOutlined />} style={{marginRight: "10px"}}></Button>
          </Popover>
          <Popconfirm title="确定删除吗？" okText="确定" cancelText="关闭" onConfirm={delectRight(item)}>
            <Button title="清除权限" type="primary" danger shape="circle" icon={<DeleteOutlined /> }></Button>
          </Popconfirm>
        </div>
      }
    },
  ];

  return (
    <div>
      <Button type="primary">添加用户</Button>
      <Table dataSource={rightList} columns={columns} />
    </div>
  )
}
