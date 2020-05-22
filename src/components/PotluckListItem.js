import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PotluckListItem.css'

export default class PotluckListItem extends Component {
    render() {
        const { potluck } = this.props
        return (
            <div className = 'potluck-container'>
                <Link to = {`/potluck/${potluck.potluck_id}`} className = 'PotluckListItem'
                    style={{ textDecoration: 'none', margin: '5px', color: 'black' }}>

                    <div className = 'PotluckTitle'> {potluck.potluck_name} </div>

                </Link>
            </div>
        )
    }
}