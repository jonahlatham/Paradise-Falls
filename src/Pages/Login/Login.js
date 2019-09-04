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
                <div className='loginDiv'>
                    <input className='loginInputs' name='email' value={this.state.email} placeholder='Email' onChange={this.handleChange} type="text" />
                    <input className='loginInputs' name='password' value={this.state.password} placeholder='Password' onChange={this.handleChange} type="password" />
                    <button className='loginButton' onClick={this.handleLogin}>Login</button>
                </div>

                <br />

                <Link className='link registerLink' to='/Register'>Register</Link>
            </div>
        )
    }
}

export default Login