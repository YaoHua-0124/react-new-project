import React, { Component } from 'react'
import { connect } from 'react-redux'

class Person extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>总数是：{this.props.count}</h2>
          <input type="text" name="userName"/>
          <input type="text" name="age"/>
          <button>添加</button>
        </div>
        <div>
          <ul>
            {
              this.props.personinfo.map((person) => {
                return <li>姓名：{person.name} &nbsp; 年龄：{person.age}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({personinfo: state.personinfo})
)(Person)
