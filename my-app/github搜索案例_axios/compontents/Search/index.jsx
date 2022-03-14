import axios from 'axios'
import React, { Component } from 'react'

export default class Search extends Component {
  getSearchWords = () => {
    const {keyWords:{value}} = this
    axios.get(`/api1/search/users?q=${value}`).then(
      response => {
        this.props.saveUserInfo(response.data.items)
      },
      error => {console.log('error', error.data)}
    )
  }
  render() {
    return (
      <div>
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <div>
            <input ref={(currentNode) => {this.keyWords = currentNode}} type="text" placeholder="enter the name you search"/>&nbsp;
            <button onClick={this.getSearchWords}>Search</button>
          </div>
        </section>
    </div>
    )
  }
}
