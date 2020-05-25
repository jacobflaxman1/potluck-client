import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PotluckContext from '../context/PotluckContext'
import './PotluckListItem.css'

export default class PotluckListItem extends Component {
    static contextType = PotluckContext

    render() {
        const { potluck } = this.props
        return (
                <Link to = {`/potluck/${potluck.potluck_id}`} className = 'potluck-container'
                    style={{ textDecoration: 'none', margin: '5px', color: 'black' }}>
                    <div className = 'PotluckTitle'> {potluck.potluck_name} </div>
                </Link>

        )
    }
}