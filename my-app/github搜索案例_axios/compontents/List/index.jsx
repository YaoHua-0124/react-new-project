import React, { Component } from 'react'
import './index.css'

export default class List extends Component {
  render() {
    const {usersInfo} = this.props
    return (
      <div>
        <div className="row">
          {
            usersInfo.map((user) => {
              return <div key={user.id} className="card">
                        <a href={user.html_url} rel="noopener noreferrer" target="_blank">
                          <img alt='图片未加载成功' src={user.avatar_url} style={{width: "100px"}}/>
                        </a>
                        <p className="card-text">{user.login}</p>
                      </div>
            })
          }
        </div>
      </div>
    )
  }
}
