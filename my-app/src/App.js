// 创建组件App
import React from 'react';
import Header from './component/Header/index'
import List from './component/List/index'
import Footer from './component/Footer/index'
import './App.css'

class App extends React.Component {
  render(){
    return(
      <div className='container'>
        <Header/>
        <List/>
        <Footer/>
      </div>
    )
  }
}

export default App