import React, { Component } from 'react'
import PotluckContext from '../context/PotluckContext'
import './PotluckListItem.css'
import PotluckItemPage from '../routes/PotluckItemPage'

export default class PotluckListItem extends Component {
    static contextType = PotluckContext

    render() {
        const { potluck } = this.props
        const { setExpanded } = this.context
        return (
                <div className = 'potluck-container' 
                    style={{ textDecoration: 'none', margin: '5px', color: 'black' }}>
                    <div className = 'expand' onClick = {() => setExpanded(potluck.potluck_id)} > {(potluck.expanded) ? <i className="arrow up"></i> : <i className="arrow down"></i>} </div>
                    <div className = 'PotluckTitle'> {potluck.potluck_name}</div>
                         <PotluckItemPage className = 'expanded-content' potluck_id ={potluck.potluck_id} expandContent = {this.expandContent}/>
                </div>
        )
    }
}

