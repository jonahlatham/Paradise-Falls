import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css'
import axios from 'axios'
import ItemsSavingFor from './Pages/ItemSavingFor/ItemsSavingFor'
import CreateNewItem from './Pages/CreateNewItem/CreateNewItem'
import Home from './Pages/Home/Home'
import Header from './Pages/Header/Header'

let baseUrl = '/api/paradisefalls'

export default class App extends Component {

  render() {

    return (
      <div className='App'>
        <Router>
          <Header />
          <Switch>
            <Route path="/ItemsSavingFor" component={ItemsSavingFor} />
            <Route path="/CreateNewItem" component={CreateNewItem} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </div>
    )
  }
}
