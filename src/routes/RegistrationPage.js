import React, { Component } from 'react'
import RegistrationForm from '../components/RegistrationForm'

export default class RegistrationPage extends Component {


  render() {
    return (
      <div className='RegistrationPage'>
        <h2>Register</h2>
        <RegistrationForm
            {...this.props}
        />
      </div>
    )
  }
}
