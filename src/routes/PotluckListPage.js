import React, { Component } from 'react'
import PotluckContext from '../context/PotluckContext'
import PotluckApiService from '../services/potluck-api-service'
import PotluckExpandedItem from '../components/PotluckExpandedItem'
import PotluckCondensedView from '../components/PotluckCondensedView'
import PostPotluckPage from './PostPotluckPage'
import './PotluckListPage.css'


export default class PotluckListPage extends Component {

    static contextType = PotluckContext

    componentDidMount() {
        this.context.clearError()
        PotluckApiService.getPotlucksByUser()
            .then(this.context.setPotluckList)
            .catch(this.context.setError)
    }

    renderPotlucks() {
        const { potluckList } = this.context
        return potluckList.map(potluck => {
            console.log(potluck.expanded)
            if(potluck.expanded) {
                return <PotluckExpandedItem
                    key = {'expanded' + potluck.potluck_id}
                    potluck = {potluck}
                />
            } else {
                return <PotluckCondensedView
                    key = {'condensed' + potluck.potluck_id}
                    potluck = {potluck}
                 />
            }
        })
    }

    render() {
        const { error, showForm } = this.context
        return(
            <div className = 'potlucks-container'>
                <div className = 'post-potluck-link'>
                    <div className = 'link-to-post' onClick = {this.context.setShowForm}>
                        {(!showForm) ? '+' : '-'}
                    </div>
                    <div className = 'potluck-form'>
                        {showForm && <PostPotluckPage onClick = {showForm}/>}
                    </div>
                </div>
                <div className = 'PotluckListPage'>
                    <h2> Your Potlucks </h2>
                    {error
                        ? <p className = 'red-error'>There Was an error, try again please. </p>
                        : this.renderPotlucks()
                    }
                </div>
            </div>
        )
    }
}