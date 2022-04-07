import React, { Component } from 'react'
// import React, { useEffect, useState } from 'react'
import {Table, Button, Popconfirm, Modal, Switch} from 'antd'
import axios from 'axios'
import {
  UnorderedListOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';

import AddUserForm from '../../../components/new-sendbox/user-manage/AddUserForm';

export default class UserList extends Component {

  state = {
    userList: [],
    regions: [],
    roles: [],
    visible: false,
    isRegionsDisabled: false
  }
  formRef = React.createRef()

  componentDidMount() {
    axios.get("http://localhost:8000/users?_expand=role").then(res => {
      // console.log(res.data);
      this.setState({userList: res.data})
    })
    axios.get("http://localhost:8000/regions").then(res => {
      // console.log(res.data);
      this.setState({regions: res.data})
    })
    axios.get("http://localhost:8000/roles").then(res => {
      // console.log(res.data);
      this.setState({roles: res.data})
    })
  }

  render() {
    const {userList, regions, visible, roles} = this.state
    // const [form] = Form.useForm();

    const changeSwitch = (item) => {
      item.roleState = !item.roleState
      this.setState(userList.map((user) => {
        if(user.id === item.id) {
          return {
            ...user,
            roleState: item.roleState
          }
        }
        return item
      }))
      axios.patch(`http://localhost:8000/users/${item.id}`, {
        roleState: item.roleState
      })
    }

    const reKey = (arr) => {
      arr.forEach(region => {
        for (const key in region) {
          if (key === 'title') {
            region.text = region[key];
            delete region[key];
          }
        }
      })
      return arr
    }

    const deleteUser = (item) => {
      console.log(item);
      this.setState({userList: userList.filter(user => user.id !== item.id)})
      axios.delete(`http://localhost:8000/users/${item.id}`)
    }

    const showModal = (item) => {
      this.setState({visible: true})
    };
    const handleOk = () => {
      this.formRef.current
              .validateFields()
              .then(values => {
                onCreate(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
      this.setState({visible: false})
    };
    const handleCancel = (item) => {
      this.setState({visible: false})
    };

    const columns = [
      {
        title: '区域',
        dataIndex: 'region',
        render: (region) => {
          return <b>{region===''? '全球':region}</b>
        },
        filters: reKey(regions),
        onFilter: (value, record) => {console.log(record); return record.region.indexOf(value) === 0},
      },
      {
        title: '角色名称',
        // dataIndex: 'roleName',
        render: (item) => {
          return item.role.roleName
        }
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '用户状态',
        // dataIndex: 'roleState',
        render: (item) => {
          return <div>
            <Switch checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    disabled={item.default}
                    checked={item.roleState}
                    onClick={ () => changeSwitch(item) }/>
          </div>
        }
      },
      {
        title: '操作',
        render: (item) => {
          return <div>
            <Button onClick={() => { console.log(item) }} disabled={item.default} title="权限管理" type="primary" shape="circle" icon={<UnorderedListOutlined />} style={{marginRight: "10px"}}></Button>
            <Popconfirm title="确定删除该人员吗？" okText="确定" cancelText="关闭" onConfirm={() => deleteUser(item) } trigger={!item.default?'click':''}>
              <Button title="删除该人员" type="primary" danger shape="circle" disabled={item.default} icon={<DeleteOutlined /> }></Button>
            </Popconfirm>
          </div>
        }
      }
    ];
    const onCreate = (values: any) => {
      let userDefault = false
      // if(values.role.key === '1'){
      //   userDefault = true;
      // }
      const newUser = {
        "username": values.username,
        "password": values.password,
        "roleState": true,
        "default": userDefault,
        "region": values.regions,
        "roleId": values.role.key*1
      }
      axios.post("http://localhost:8000/users",newUser).then(res => {
        axios.get("http://localhost:8000/users?_expand=role").then(res => {
          // console.log(res.data);
          this.setState({userList: res.data})
        })
      })
    };
    return (
      <div>
        <Button type="primary" onClick={ () => showModal() }>添加用户</Button>
        <Modal
          visible={visible}
          title="添加人员"
          okText="确定添加"
          cancelText="取消"
          onCancel={ () => { handleCancel() }}
          onOk={() => { handleOk() }}
        >

          <AddUserForm regions={regions} roles={roles} ref={this.formRef}/>

          {
          /*  <Form
            ref={this.formRef}
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入需要添加的用户名！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码！' }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="regions" label="区域">
              <Select disabled = {isRegionsDisabled}>
                {
                  regions.map( region => {
                    return <Option key={region.id} value={region.value}>{region.text}</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择一种角色！' }]}>
              <Select onChange={selectRole} labelInValue>
                {
                  roles.map( role => {
                    return <Option key={role.id} value={role.roleType}>{role.roleName}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form> */
          }
        </Modal>
        <Table dataSource={this.state.userList} columns={columns} rowKey={(item) => item.id}/>
    </div>
    )
  }
}
