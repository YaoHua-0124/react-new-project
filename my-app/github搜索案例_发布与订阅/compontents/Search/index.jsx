import axios from 'axios'
import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {
  getSearchWords = () => {
    PubSub.publish('updateAppState', {isFristLoad: false, isLoading: true});
    const {keyWords:{value}} = this
    axios.get(`/api1/search/users?q=${value}`).then(
      response => {
        PubSub.publish('updateAppState', {isLoading: false, usersInfo: response.data.items});
      },
      error => {
        PubSub.publish('updateAppState', {isLoading: false, LoadError: error.message});
      }
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
