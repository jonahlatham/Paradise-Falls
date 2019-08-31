import React, { Component } from 'react'
import axios from 'axios'
import './ItemsSavingFor.css'

let baseUrl = '/api/paradisefalls'

class ItemsSavingFor extends Component {

    state = {
        listedItems: [],
    }

    componentDidMount() {
        axios.get(baseUrl)
          .then((response) => {
            this.setState({
              listedItems: response.data
            })
          })
      }

    render() {
        let allItems = this.state.listedItems.map((e, i) => {
            return <div key={i} className='savedItems'>Name: {e.name} <br />
              Price: {e.price} <br />
              Amount Saved: {e.amount_saved} <br /> <br /></div>
          })
        return (
            <div className='flexedItems'>
                {allItems}
            </div>
        )
    }
}

export default ItemsSavingFor