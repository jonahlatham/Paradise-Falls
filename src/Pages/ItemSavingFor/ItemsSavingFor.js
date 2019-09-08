import React, { Component } from 'react'
import axios from 'axios'
import './ItemsSavingFor.css'
import ItemSavingFor from './ItemSavingFor/ItemSavingFor'

let baseUrl = '/api/paradisefalls'

class ItemsSavingFor extends Component {

  state = {
    listedItems: [],
    amount_saved: '',
  }

  componentDidMount() {
    axios.get(baseUrl)
      .then((response) => {
        this.setState({
          listedItems: response.data.map((e, i) => {
            e.isEdit = false
            return e
          })
        })
      })
  }

  

  render() {
    let evens = this.state.listedItems.map((e, i) => {
      if (i % 2 === 0) {
        return 
      }
    })

    let odds = this.state.listedItems.map((e, i) => {
      if (i % 2 !== 0) {
        return <div key={i} className='savedItems'>Name: {e.name} <br />
          Price: {e.price} <br />
          Amount Saved: {e.amount_saved} <br />
          <button>Edit</button></div>
      }
    })
    return (
      <div className='flexedItems'>
        <div className='side'>
          {evens}
        </div>
        <div className='side'>
          {odds}
        </div>
      </div>
    )
  }
}

export default ItemsSavingFor