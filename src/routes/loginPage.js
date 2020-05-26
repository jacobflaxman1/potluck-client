import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import './LoginPage.css'
export default class LoginPage extends Component {

    render() {
        return(
            <>
                <h2>Login</h2>
                <div className = 'login-page'>
                    <LoginForm 
                        {...this.props}
                    />
                </div>
            </>
        )
    }
}