import React, { Component } from 'react'
import './Header.css'
import { Link } from "react-router-dom"

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/ItemsSavingFor'>Dream List</Link>
                <Link className='link' to='/CreateNewItem'>Make New Item</Link>
            </div>
        )
    }
}

export default Header