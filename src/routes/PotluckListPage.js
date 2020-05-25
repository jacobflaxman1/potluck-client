import React, { Component } from 'react'
import PotluckListContext from '../context/PotluckListContext'
import PotluckApiService from '../services/potluck-api-service'
import PotluckListItem from '../components/PotluckListItem'
import { Link } from 'react-router-dom'
import './PotluckListPage.css'

export default class PotluckListPage extends Component {

    static contextType = PotluckListContext
    state = {
        expanded: false
    }
    componentDidMount() {
        this.context.clearError()
        PotluckApiService.getPotlucksByUser()
            .then(this.context.setPotluckList)
            .catch(this.context.setError)
    }
    expandContent = () => {
        this.setState({ expanded: !this.state.expanded})
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
            <div className = 'potlucks-container'>
                <div className = 'post-potluck-link'>
                    <Link className = 'link-to-post' to = {'/potlucks/post'}> New Potluck </Link>
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