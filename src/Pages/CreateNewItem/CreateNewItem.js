import React, { Component } from 'react'
import axios from 'axios'
import './CreateNewItem.css'

let baseUrl = '/api/paradisefalls'
class CreateNewItem extends Component {
    state = {
        name: '',
        price: '',  
        amount_saved: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAdd = () => {
        const body = {
            name: this.state.name,
            price: this.state.price,
            amount_saved: this.state.amount_saved
        }
        axios.post(baseUrl, body)
        this.setState({
            name: '',
            price: '',
            amount_saved: '',
        })
    }

    render() {
        return (
            <div className='inputs'>
                <input placeholder='Name of Item' className='addInputs' onChange={this.handleChange} type="text" name="name" value={this.state.name} /> <br />
                <input placeholder='Price' className='addInputs' onChange={this.handleChange} type="text" name="price" value={this.state.price} /> <br />
                <input placeholder='Amount Saved' className='addInputs' onChange={this.handleChange} type="text" name="amount_saved" value={this.state.amount_saved}     onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.handleAdd()
                }
              }}/>
                <button className='addCrap' onClick={this.handleAdd}>Add it</button>
            </div>
        )
    }
}

export default CreateNewItem 