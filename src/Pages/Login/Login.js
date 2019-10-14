import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'
import { Link } from "react-router-dom"

let loginUrl = '/auth/login'
class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = () => {
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(loginUrl, body)
        .then((response) => {
            debugger
                if (response.data.success) {
                    this.props.setUser(response.data.catchUser)
                    this.props.history.push('/Home')
                } else {
                    alert(response.data.err)
                }
            })
    }

    render() {
        return (
            <div className='loginApp'>
                <div><img className='loginImg' src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1390&q=80" alt="img" /></div>
                <div className='loginMainDiv'>

                    <div className='loginDiv'>
                        <input className='loginInputs' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} type="text" />
                        <input className='loginInputs' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} type="password" onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.handleLogin()
                            }
                        }} />
                        <br /><br />
                        <button className='loginButton' onClick={this.handleLogin}>Login</button>
                    </div>

                    <br /><br /><br />
                    <small>Don't have an account? </small>
                    <br /><br />

                    <Link className='link registerLink' to='/Register'><small>Register</small></Link>
                </div>
            </div>
        )
    }
}

export default Login