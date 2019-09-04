import React, { Component } from 'react'
import './Header.css'
import { Link } from "react-router-dom"

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='pagesInHeader'>
                    {
                        this.props.user ? (
                            <div>
                                <Link className='link' to='/Home'>Home</Link>
                                <Link className='link' to='/ItemsSavingFor'>Dream List</Link>
                                <Link className='link' to='/CreateNewItem'>Make New Item</Link>
                            </div>
                        ) : ''
                    }

                </div>
                <div className='loginInHeader'>
                    { this.props.user ? <button className='logoutButton' onClick={this.props.handleLogout}>Logout</button> : <Link className='link loginLink' to='/'>Login</Link> }
                    
                </div>
            </div>
        )
    }
}

export default Header