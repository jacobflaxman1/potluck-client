import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import PotluckContext from '../context/PotluckContext'
import './Header.css'

export default class Header extends Component {
    static contextType = PotluckContext



    handleLogoutClick = () => {
      TokenService.clearAuthToken()
      this.context.clearAuthToken()
    }


    renderLogoutLink() {
        return (
          <div className='Header__logged-in'>
            <Link
              style={{ textDecoration: 'none' }}
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </div>
        )
      }

    renderLoginLink() {
    return (
        <div className='Header__not-logged-in'>
        <Link
            style={{ textDecoration: 'none' }}
            to='/login'>
            Log in
        </Link>
        <Link
            style={{ textDecoration: 'none', margin: '5px' }}

            to='/register'>
            Register
        </Link>
        </div>
    )
    }

    render() {
        return <>
          <nav className='Header'>
            {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()
            }
            <h1>
              <Link to='/' style={{ textDecoration: 'none', margin: '5px' }}>
                {' '}
                Potluck
              </Link>
            </h1>
          </nav>
        </>
      }
    }