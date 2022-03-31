import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createAddPersonAction} from '../../redux/actions/person'
class Person extends Component {
  addPersonInfo = () => {
    const personObj = {
      userName: this.userName.value,
      age: this.age.value
    }
    this.props.addPersonInfo(personObj)
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <h2>总数是：{this.props.count}</h2>
          <input ref={(currentNode) => {this.userName = currentNode}} type="text" name="userName"/>
          <input ref={(currentNode) => {this.age = currentNode}} type="text" name="age"/>
          <button onClick={this.addPersonInfo}>添加</button>
        </div>
        <div>
          <ul>
            {
              this.props.personinfo.map((person,index) => {
                return <li key={index}>姓名：{person.userName} &nbsp; 年龄：{person.age}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default connect(
  state => {return ({count: state.countReducer, personinfo: state.personinfo})},
  {
    addPersonInfo: createAddPersonAction,
  }
)(Person)
