import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default class List extends Component {
  state = {
    usersInfo:[],
    isFristLoad: true,
    isLoading: false,
    LoadError:''
  }
  componentDidMount() {
    /* 订阅：
        subscribe(msg,data)接受两个参数
          msg: 频道名
          data：数据
    */
    this.token = PubSub.subscribe('updateAppState', (_, data) => {
      this.setState(data)
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token)
  }
  render() {
    const {usersInfo,isFristLoad,isLoading,LoadError} = this.state
    return (
      <div>
        <div className="row">
          {
            isFristLoad? <h1>欢迎使用，请输入关键词并点击按钮进行搜索</h1>:
            isLoading? <h2>正在加载数据，请稍等。。。</h2>:
            LoadError? <h2 style={{color:'red'}}>{LoadError}</h2>:
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
