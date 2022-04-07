import React, { useEffect, useState } from 'react'
import {Table, Button, Popconfirm, Modal, Tree} from 'antd'
import axios from 'axios'
import {
  UnorderedListOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export default function RoleList() {
  const [roleList, setroleList] = useState([])

  const getList = () => {
    axios.get("http://localhost:8000/roles").then( res => {
      const list = res.data
      setroleList(list)
    })
  }

  /**列表开始 */
  useEffect( () => {
    getList()
  }, [])
  const deleteRole = (item) => {
    axios.delete(`http://localhost:8000/roles/${item.id}`).then( res => {
      getList()
    })
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
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button onClick={() => { showModal(item) }} title="权限管理" type="primary" shape="circle" icon={<UnorderedListOutlined />} style={{marginRight: "10px"}}></Button>
          <Popconfirm  title="确定删除吗？" okText="确定" cancelText="关闭" onConfirm={() => { deleteRole(item) }} >
            <Button title="删除角色" type="primary" danger shape="circle" icon={<DeleteOutlined /> }></Button>
          </Popconfirm>
        </div>
      }
    }
  ];
  /**列表结束 */

  /**模态框开始 */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (item) => {
    setRoleRight(item.rights)
    setRoleId(item.id)
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setroleList(roleList.map(item => {
      if(item.id === roleId){
        return {
          ...item,
          rights: roleRight
        }
      }
      return item
    }))
    axios.patch(`http://localhost:8000/roles/${roleId}`,{
      rights: roleRight
    })
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  /**模态框结束 */
  
  /**树结构开始 */
  const [rightList, setRightList] = useState([]);
  const [roleRight, setRoleRight] = useState([])
  const [roleId, setRoleId] = useState(0)
  useEffect( () => {
    axios.get("http://localhost:8000/rights?_embed=children").then( res => {
      setRightList(res.data)
    })
  }, [])
  const onCheck = (keys) => {
    // setRoleRight([...keys])
    setRoleRight([...keys.checked])
    // console.log(keys.checked);
    // axios.patch(`http://localhost:8000/rights/${}`)
  }
  /**树结构结束 */

  return (
    <div>
      <Table dataSource={roleList} columns={columns} rowKey={(item) => item.id}/>
      <Modal title="权限管理" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Tree
        checkable
        checkedKeys={roleRight}
        onCheck={onCheck}
        checkStrictly={true}
        treeData={rightList}
      />
      </Modal>
    </div>
  )
}
