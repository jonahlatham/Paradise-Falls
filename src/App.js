import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css'
import axios from 'axios'
import ItemsSavingFor from './Pages/ItemSavingFor/ItemsSavingFor'
import CreateNewItem from './Pages/CreateNewItem/CreateNewItem'
import Home from './Pages/Home/Home'
import Header from './Pages/Header/Header'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register';

let baseUrl = '/api/paradisefalls'

export default class App extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    axios.get('/auth/user')
      .then((response) => {
        if (response.data.success) {
          this.setUser(response.data.user)
        }
      })
  }

  handleLogout = () => {
    axios.delete('/auth/user')
      .then((response) => {
        if (response.data.success) {
          this.setUser(null)
        } else {
          alert('something blew up')
        }
      })
  }

  setUser = (user) => {
    this.setState({
      user
    })
  }
 
  render() {
    let crap = ''
    if (this.state.user) {
      crap = <div>
        <Route path="/Home" component={Home} />
        <Route path="/ItemsSavingFor" component={ItemsSavingFor} />
        <Route path="/CreateNewItem" component={CreateNewItem} />
      </div>
    }   


    return (
      <div className='App'>
        <Router>
          <Header handleLogout={this.handleLogout} user={this.state.user} />
          <Switch>
            {crap}
            <Route path="/Register" render={(props) => <Register {...props} setUser={this.setUser} />} />
            <Route path="/" render={(props) => <Login {...props} setUser={this.setUser} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}
