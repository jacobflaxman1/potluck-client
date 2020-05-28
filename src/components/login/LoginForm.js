import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import PotluckContext from '../../context/PotluckContext'
import './LoginForm.css'
export default class LoginForm extends Component {
//   static defaultProps = {
//     onLoginSuccess: () => {}
//   }

  static contextType = PotluckContext

  state = { error: null }

  handleSubmitBasicAuth = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    )

    user_name.value = ''
    password.value = ''
    this.props.history.push('/')
  }

  handleSubmitJwtAuth = (e) => {
    e.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = e.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
    .then(res => {
      user_name.value = ''
      password.value = ''
      TokenService.saveAuthToken(res.authToken)
      this.context.saveAuthToken(res.authToken)
      this.props.history.push('/')
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <input className = 'input-fields'
            required
            name='user_name'
            id='LoginForm__user_name'
            placeholder = 'User Name'
          >
            
          </input>
        </div>
        <div className='password'>
          <input className = 'input-fields'
            required
            name='password'
            type='password'
            id='LoginForm__password'
            placeholder = 'Password'
            >
          </input>
        </div>
        <button className = 'login' type='submit'>
          Login
        </button>
      </form>
    )
  }
}