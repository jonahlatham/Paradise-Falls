import React, { Component } from 'react'
import axios from 'axios'

let baseUrl = '/api/paradisefalls'

class ItemSavingFor extends Component {
    state = {
        isEdit: false,
        amount_saved: '',
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdate = (amount_saved, id) => {
        const body = {
          amount_saved, 
          id,
        }
        axios.put(baseUrl, body)
          .then((response) => {
            this.props.handleUpdate(response.data)
            this.setState({
              amount_saved: '',
              isEdit: false
            })
          })
      }

    handleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit,
            amount_saved: ''
        })
    }

    render() {
        let edit = ''
        if (this.state.isEdit) {
            edit = <div><input type='text' name='amount_saved' placeholder='Amount Saved' value={this.state.amount_saved} onChange={this.handleChange} /><button onClick={() => { this.handleUpdate(this.state.amount_saved, this.props.item.id) }}>Save</button></div>
        } else {
            edit = <div> Amount Saved: {this.props.item.amount_saved}</div>
        }
        return <div key={this.props.item.id} className='savedItems'>Name: {this.props.item.name} <br />
            Price: {this.props.item.price} <br />
            {edit}
            <button onClick={this.handleEdit}>{!this.state.isEdit ? 'Edit' : 'Cancel'}</button></div>
    }
}

export default ItemSavingFor