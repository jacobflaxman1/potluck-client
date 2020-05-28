import React, { Component } from 'react'
import RegistrationForm from '../components/register/RegistrationForm'
import './RegistrationPage.css'
export default class RegistrationPage extends Component {


  render() {
    return (
      <div className='RegistrationPage'>
        <RegistrationForm
            {...this.props}
        />
      </div>
    )
  }
}
