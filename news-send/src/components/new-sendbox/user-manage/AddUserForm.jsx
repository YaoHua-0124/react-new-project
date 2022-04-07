import React,{forwardRef, useState} from 'react'
import {Form, Input, Select} from 'antd'
const { Option } = Select;

const AddUserForm = forwardRef((props,formRef)=>{

  const [isRegionsDisabled,setIsRegionsDisabled] = useState(false)
  // const formRef = useRef()

  const selectRole = (item) => {
    if(item.label === "超级管理员"){
      setIsRegionsDisabled(true)
      formRef.current.setFieldsValue({
        regions: ''
      })
      // console.log(this.formRef.current.setFieldsValue);
    } else {
      setIsRegionsDisabled(false)
    }
  }
  return (
    <Form
      ref={formRef}
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
            props.regions.map( region => {
              return <Option key={region.id} value={region.value}>{region.text}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择一种角色！' }]}>
        <Select onChange={selectRole} labelInValue>
          {
            props.roles.map( role => {
              return <Option key={role.id} value={role.roleType}>{role.roleName}</Option>
            })
          }
        </Select>
      </Form.Item>
    </Form>
  )
})
export default AddUserForm