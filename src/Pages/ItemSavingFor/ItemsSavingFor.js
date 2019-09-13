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

  handleUpdate = (data) => {
        this.setState({
          listedItems: data
        })
  }

  render() {
    let evens = this.state.listedItems.map((e, i) => {
      if (i % 2 === 0) {
        return <ItemSavingFor key={e.id} handleUpdate={this.handleUpdate} item={e} />
      }
    })

    let odds = this.state.listedItems.map((e, i) => {
      if (i % 2 !== 0) {
        return <ItemSavingFor key={e.id} handleUpdate={this.handleUpdate} item={e} />
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