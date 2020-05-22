import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

export default class LoginPage extends Component {

    render() {
        return(
            <div className = 'login-page'>
                <h2>Login</h2>
                <LoginForm 
                    {...this.props}
                />
            </div>
        )
    }
}