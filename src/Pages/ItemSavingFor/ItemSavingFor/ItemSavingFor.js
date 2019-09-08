import React, { Component } from 'react'

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

    handleEdit = () => {
        const body = {
            amount_saved: ''
        }
        this.setState({
            isEdit: !isEdit,
            amount_saved: ''
        })
    }
    render() {
        if(this.state.isEdit){
            return <div><input type='text' name='amount_saved' value={this.state.amount_saved} onChange={this.handleChange} /><button onClick={this.props.handleEdit}>Save</button></div>
        } else {
            return <div>Amount Saved: {amount_saved}</div>
        }
        return <div key={i} className='savedItems'>Name: {e.name} <br />
        Price: {e.price} <br />
        {edit(e.amount_saved, e.id)}
        <button onClick={this.handleEdit}>{!this.state.isEdit ? 'Edit' : 'Cancel'}</button></div>
    }
}

export default ItemSavingFor