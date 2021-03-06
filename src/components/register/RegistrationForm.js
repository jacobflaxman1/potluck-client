import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'
export default class RegistrationForm extends Component {

    state = { error: null }

    handleSubmit = e => {
        e.preventDefault()
        const { user_name, nick_name, password } = e.target
        AuthApiService.postUser({
            user_name: user_name.value,
            nick_name: nick_name.value,
            password: password.value
        })
        .then(user => {
            user_name.value = ''
            nick_name.value = ''
            password.value = ''
            this.props.history.push('/login')
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    render() {
        const { error } = this.state
        return(
            <form className = 'RegistrationForm' onSubmit = {this.handleSubmit}>
                <div> { error && <p>{error} </p> } </div>
                <input placeholder = 'UserName' className = 'register-input' name = 'user_name' required type = 'text'/>
                
                <input placeholder = 'NickName' className = 'register-input' name = 'nick_name' required type = 'text'/>

                <input placeholder = 'password' className = 'register-input' name = 'password' required type = 'password'/>

                <button type= 'submit' className = 'register'> Register </button>
            </form>
        )
    }
}