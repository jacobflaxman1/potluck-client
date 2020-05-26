import React, { Component } from 'react'
import PotluckContext from '../context/PotluckContext'
import PotluckApiService from '../services/potluck-api-service'
import ItemInPotluck from '../components/ItemInPotluck'
import './PotluckItemPage.css'

export default class PotluckItemPage extends Component {

    static contextType = PotluckContext

    componentDidMount() {
        const potluck_id = this.props.potluck_id
        console.log('potluck_id',potluck_id)
        PotluckApiService.getItemsInPotluck(potluck_id)
            .then(this.context.setItems)
            .catch(this.context.setError)
        PotluckApiService.getPotluckById(potluck_id)
            .then(this.context.setPotluck)
            .catch(this.context.setError)
        this.context.getGuestUsersInPotluck(potluck_id)
        this.context.getAdminUserInPotluck(potluck_id)
    }

    deletePotluck = () => {
        const potluck_id = this.props.potluck_id
        PotluckApiService.deletePotluck(potluck_id)
            .then(this.context.clearPotluck)
        PotluckApiService.getPotlucksByUser()
            .then(this.context.setPotluckList)
            .catch(this.context.setError)
    }

    renderPotluck() {
        const { potluck, adminUser } = this.context
        return (
            <PotluckExpandedContent potluck = {potluck} adminUser = {adminUser}/>
        )
    }
    
    renderItemsInPotluck() {
        const { items } = this.context
        return (
            <ItemInPotluck className = 'itemInPotluck'
                key = {items.item_id}
                items = {items}
            />
        )
    }
    renderGuestUsersPotluck() {
        const { usersInPotluck } = this.context
        return (
            <GuestUsersInPotluck 
                users = {usersInPotluck}
            />
        )
    }
    render() {
        return(
            <div className = 'potluck-items'>
                <div className = 'potluck-div'>
                     {this.renderPotluck()}
                </div>
                <div className = 'users-div'>
                    {this.renderGuestUsersPotluck()}
                </div>
                <div className = 'items-div'>
                 <h2>What They're Bringing</h2>
                    {this.renderItemsInPotluck()}
                </div>
                <button className = 'delete' onClick = {this.deletePotluck}> Delete </button>
            </div>
        )
    }
}

function PotluckExpandedContent(props) {
    let user = props.adminUser.map(x => {
        return props.adminUser[0].user_name
    })
    return (
        <>
            <div className = 'potluck-expanded-name'> 
                {props.potluck.potluck_name}
            </div>
            <p className = 'created-by'> Created by {user}</p>
        </>
    )
}

function GuestUsersInPotluck({ users }) {
let guestUsers = users.map((user ,index) => {
    return <ul> <li key = {index}> {user.user_name} </li></ul>
    })
    return (
        <div>
            <h2 className = 'people-coming'> Whose All Coming </h2>
            {guestUsers}
        </div>
    )
}