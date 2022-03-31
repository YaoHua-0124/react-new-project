import React, { Component } from 'react'
import { Route,Switch,Redirect,NavLink } from 'react-router-dom'
import NowPlaying from './Films/NowPlaying'
import ComingSoon from './Films/ComingSoon'
import NotFound from './NotFound'

export default class Films extends Component {
  render() {
    return (
      <div>
        <div style={{height: "200px",backgroundColor:"skyblue"}}>
          轮播图
        </div>
        <div>
          <span style={{margin:"8px 20px 8px 5px"}}><NavLink to='/films/nowPlaying'>正在热映</NavLink></span>
          <span style={{margin:"8px 20px 8px 5px"}}><NavLink to='/films/comingsoon'>即将上映</NavLink></span>
        </div>
        <div>
        <Switch>
          <Route path={"/films/nowPlaying"} component={NowPlaying}/>
          <Route path={"/films/comingsoon"} component={ComingSoon}/>
          <Redirect from="/films" to="/films/nowPlaying" exact />
          <Route component={NotFound}/>
        </Switch>
        </div>
      </div>
    )
  }
}
