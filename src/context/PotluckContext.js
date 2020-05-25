import React, { Component } from 'react'
import itemApiService from '../services/item-api-service'
import UserApiService from '../services/user-api-service'

const PotluckContext = React.createContext({
    potluck: [],
    items: [],
    error:null,
    authToken: null,
    users: [],
    adminUser: [],
    usersInPotluck: [],
    setEror: () => {},
    setPotluck: () => {},
    setItems: () => {},
    clearError: () => {},
    clearPotluck: () => {},
    saveAuthToken: () => {},
    clearAuthToken: () => {},
    addPostedPotluck: () => {},
    updateItem: () => {},
    getAllUserNames: () => {},
    getGuestUsersInPotluck: () => {},
    getAdminUserInPotluck: () => {}
})

export default PotluckContext

export class PotluckProvider extends Component {
    state = {
        potluck: [],
        items: [],
        users: [],
        adminUser: [],
        usersInPotluck:[],
        error: null,
        authToken: null
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setPotluck = (potluck) => {
        this.setState({ potluck })
    }
    setItems = (items) => {
        this.setState({ items })
    }

    clearPotluck = () => {
        this.setPotluck([])
    }

    saveAuthToken = (authToken) => {
        this.setState({ authToken })
    }

    clearAuthToken = () => {
        this.setState({ authToken: null })
    }

    addPostedPotluck = (newPotluck) => {
        this.setState({ potluck: [...this.state.potluck, newPotluck] })
    }
    
    updateItem = (id) => {
        itemApiService.updateItem(id)
            .then((data) => {
                const newItemData = this.state.items.map((item) => {
                    if(id === item.item_id) {
                        return data
                    }
                    return item
                })
        this.setState({items: newItemData})
        })
    }

    getAllUserNames = () => {
        UserApiService.getUsers()
            .then((data) => {
                console.log(data)
                let userNames = data.rows.map(user => {
                    return user
                })
                this.setState({ users: userNames})
            })
    }
    getGuestUsersInPotluck = (id) => {
        UserApiService.getUsersByPotluck(id)
            .then((data) => {
                console.log('usernamews:',data)
                let userNames = data.guests.map(user => {
                    return user
                })
                this.setState({ usersInPotluck: userNames})
        })
    }
    getAdminUserInPotluck = (id) => {
        UserApiService.getUsersByPotluck(id) 
            .then((data) => {
                let adminUser = data.admin.map(ad => {
                    return ad
                })
                this.setState({ adminUser: adminUser})
            })
    }

    render() {
        console.log(this.state.adminUser, 'users in state')
        const value = {
            potluck: this.state.potluck,
            items: this.state.items,
            taken: false,
            users: this.state.users,
            usersInPotluck: this.state.usersInPotluck,
            adminUser: this.state.adminUser,
            error: this.state.error,
            authToken: this.state.authToken,
            setItems: this.setItems,
            setError: this.setError,
            setPotluck: this.setPotluck,
            clearPotluck: this.clearPotluck,
            saveAuthToken: this.saveAuthToken,
            clearAuthToken: this.clearAuthToken,
            addPostedPotluck: this.addPostedPotluck,
            updateItem: this.updateItem,
            getAllUserNames: this.getAllUserNames,
            getGuestUsersInPotluck: this.getGuestUsersInPotluck,
            getAdminUserInPotluck: this.getAdminUserInPotluck
        }
        return(
            <PotluckContext.Provider value = {value}>
                {this.props.children}
            </PotluckContext.Provider>
        )
    }

}