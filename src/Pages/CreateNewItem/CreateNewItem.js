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
            <div>
                <div className='inputs'>
                    Name: <input className='addInputs' onChange={this.handleChange} type="text" name="name" value={this.state.name} /> <br />
                    Price: <input className='addInputs' onChange={this.handleChange} type="text" name="price" value={this.state.price} /> <br />
                    Amount Saved: <input className='addInputs' onChange={this.handleChange} type="text" name="amount_saved" value={this.state.amount_saved} />
                </div>
                <button className='addCrap' onClick={this.handleAdd}>Add it</button>
            </div>
        )
    }
}

export default CreateNewItem