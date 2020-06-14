import React, { Component } from 'react'
import PotluckContext from '../context/PotluckContext'
import PotluckApiService from '../services/potluck-api-service'
import ItemInPotluck from '../components/PotluckViews/ItemInPotluck'
import './PotluckItemPage.css'

export default class PotluckItemPage extends Component {

    static contextType = PotluckContext

    state = {
        deleted: false
    }

    componentDidMount() {
        const potluck_id = this.props.potluck_id
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
                .catch(this.context.setError)
            this.context.clearPotluckInList(potluck_id)

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
        <ul className = 'list-ul'>
            <ItemInPotluck className = 'itemInPotluck'
                key = {items.item_id}
                items = {items}
            />
        </ul>
        )
    }
    renderGuestUsersPotluck() {
        const { usersInPotluck } = this.context
        console.log(usersInPotluck)
        if(usersInPotluck.length === 0) {
            console.log('test', usersInPotluck)
            return <div></div>
        }
        else {
            console.log('test1', usersInPotluck)
            return (
            <GuestUsersInPotluck 
                users = {usersInPotluck}
            />
        )
        }
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
                 <p className = 'hint'>(Click on an item to take it)</p>
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
    return <li className = 'user-list' key = {index}> {user.user_name} </li>
    })
    if(!guestUsers) {
        return <div></div>
    }
    return (
        <div>
            <h2 className = 'people-coming'> Whose Coming </h2>
            <ul> {guestUsers} </ul>
        </div>
    )
}