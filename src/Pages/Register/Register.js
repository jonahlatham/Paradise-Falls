import React, { Component } from 'react'
import './Register.css'
import axios from 'axios'
import { Link } from "react-router-dom"

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = () => {
        const body = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('/auth/register', body)
            .then((response) => {
                if (response.data.success) {
                    this.props.setUser(response.data.user)
                    this.props.history.push('/Home')
                } else {
                    alert(response.data.err)
                }
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                })
            })
    }

    render() {
        return (
            <div className='registerApp'>
                <div className='registerDiv'>
                    <input className='registerInputs' name='first_name' value={this.state.first_name} onChange={this.handleChange} placeholder='First Name' type="text" />
                    <input className='registerInputs' name='last_name' value={this.state.last_name} onChange={this.handleChange} placeholder='Last Name' type="text" />
                    <input className='registerInputs' name='email' value={this.state.email} onChange={this.handleChange} placeholder='Email' type="text" />
                    <input className='registerInputs' name='password' value={this.state.password} onChange={this.handleChange} placeholder='Password' type="text"     onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.handleRegister()
                }
              }}/>

                    <button className='registerButton' onClick={this.handleRegister}>Register</button>
                    <div className='or'>or</div>
                    <Link className='registerLogin' to='/'>Login</Link>
                </div>
            </div>
        )
    }
}

export default Register