import React, { useEffect, useState } from 'react'
import {Table, Tag, Button, Popconfirm} from 'antd'
import axios from 'axios'
import {
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';

export default function RightList(props) {

  const [rightList, setrightList] = useState([])

  useEffect( () => {
    axios.get("http://localhost:8000/rights?_embed=children").then( res => {
      const list = res.data
      list.findIndex((item, index)=>{
        if(!item.children.length) list[index].children = ""
      })
      setrightList(list)
    })
  }, [])

  const delectRight = (item) => {
    return () => {
      setrightList(rightList.filter(data => data.id!==item.id))
      axios.delete(`http://localhost:8000/rights/${item.id}`).then(() => {
        
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
          <Button title="添加权限" type="primary" shape="circle" icon={<PlusOutlined />}></Button>
          <Popconfirm title="确定删除吗？" okText="确定" cancelText="关闭" onConfirm={delectRight(item)}>
            <Button title="清除权限" type="primary" danger shape="circle" icon={<DeleteOutlined /> }></Button>
          </Popconfirm>
        </div>
      }
    },
  ];

  return (
    <div>
      <Table dataSource={rightList} columns={columns} />
    </div>
  )
}
