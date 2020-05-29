import React, { Component } from 'react'
import LoginForm from '../components/login/LoginForm'
import './LoginPage.css'
export default class LoginPage extends Component {

    render() {
        return(
            <>
                <div className = 'login-page'>
                    <LoginForm 
                        {...this.props}
                    />
                </div>
            </>
        )
    }
}