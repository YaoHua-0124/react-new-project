import React, { Component } from 'react'
import axios from 'axios'

export default class ComingSoon extends Component {
  state = {
    films: []
  }
  showDetail = (id) => {
    return () => {
      this.props.history.push(`/detail/${id}`)
    }
  }
  componentDidMount(){
    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=9034793",
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16481038997353151514476545","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }

    }).then(res => {
      this.setState({films: res.data.data.films})
    })
  }
  render() {
    return (
      <div>
        {
          this.state.films.map((film) => 
            <li key={film.filmId} onClick={this.showDetail(film.filmId)}>电影名：{film.name}---上映时间：{new Date(film.premiereAt*1000).toLocaleDateString().replace(/\//g, "-")}</li>
          )
        }
      </div>
    )
  }
}