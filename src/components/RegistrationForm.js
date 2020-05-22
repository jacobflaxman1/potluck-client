import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'

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
                <label htmlFor = 'registrationForm-userName'> User Name </label>
                <input name = 'user_name' required type = 'text'/>
                
                <label htmlFor = 'registrationForm-nickName'> Nick Name </label>
                <input name = 'nick_name' required type = 'text'/>

                <label htmlFor = 'registrationForm-password'> Password </label>
                <input name = 'password' required type = 'text'/>

                <button type= 'submit'> Register </button>
            </form>
        )
    }
}