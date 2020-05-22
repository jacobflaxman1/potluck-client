import React, { Component } from 'react'
import PotluckListContext from '../context/PotluckListContext'
import PotluckApiService from '../services/potluck-api-service'
import PotluckListItem from '../components/PotluckListItem'
import { Link } from 'react-router-dom'
import './PotluckListPage.css'

export default class PotluckListPage extends Component {

    static contextType = PotluckListContext
    
    componentDidMount() {
        this.context.clearError()
        PotluckApiService.getPotlucksByUser()
            .then(this.context.setPotluckList)
            .catch(this.context.setError)
    }

    renderPotlucks() {
        const { potluckList } = this.context
        return potluckList.map(potluck => 
            <PotluckListItem
                key = {potluck.potluck_id}
                potluck = {potluck}
            />
            )
    }

    render() {
        const { error } = this.context
        return(
            <>
                <div className = 'post-potluck-link'>
                    <Link to = {'/potlucks/post'}> New Potluck </Link>
                </div>
                <div className = 'PotluckListPage'>
                    {error
                        ? <p className = 'red-error'>There Was an error, try again please. </p>
                        : this.renderPotlucks()
                    }
                </div>
            </>
        )
    }
}