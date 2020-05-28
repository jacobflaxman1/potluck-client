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
    getAdminUserInPotluck: () => {},
    // LIST CONTEXT
    potluckList: [],
    user: '',
    setPotluckList: () => {},
    setUser: () => {},
    setShowForm: () => {},
    showForm: false,
    setExpanded: () => {},
    render: false,
    setRender: () => {},
    clearPotluckInList: () => {}
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
        authToken: null,
        showForm: false,
        //LIST STATE
        potluckList: [],
        user: '',
        render: false
    }

    setRender = () => {
        this.setState({ render: !this.state.render})
    }

    setShowForm = () => {
        this.setState({ showForm: !this.state.showForm })
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

    clearPotluckInList = (id) => {
        let newList = [...this.state.potluckList]
        let index = this.state.potluckList.findIndex(el => el.potluck_id === id)

        if(index !== -1) {
            newList.splice(index, 1)
            this.setState({potluckList: newList})
        }
        
    }

    saveAuthToken = (authToken) => {
        this.setState({ authToken })
    }

    clearAuthToken = () => {
        this.setState({ authToken: null })
    }

    addPostedPotluck = (newPotluck) => {
        this.setState({ potluckList: [...this.state.potluckList, {...newPotluck, expanded: true}] })
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
                let userNames = data.rows.map(user => {
                    return user
                })
                this.setState({ users: userNames})
            })
    }
    getGuestUsersInPotluck = (id) => {
        console.log(id)
        UserApiService.getUsersByPotluck(id)
            .then((data) => {
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
    //LIST FUNCTIONS
    setPotluckList = potluckList => {
        const expandedPotluckList = potluckList.map(data => {
            return {...data, expanded: false}
        })

        this.setState({ potluckList: expandedPotluckList })
      }

    setUser = (user) => {
        this.setState({ user })
      }


    setExpanded = (id) => {
        const index = this.state.potluckList.findIndex(el => el.potluck_id === id)
        let newPotluckState = [...this.state.potluckList]

        newPotluckState[index] = {...newPotluckState[index], expanded: !newPotluckState[index].expanded}
        this.setState({ potluckList: newPotluckState })
    }

    render() {
        const value = {
            potluck: this.state.potluck,
            items: this.state.items,
            users: this.state.users,
            usersInPotluck: this.state.usersInPotluck,
            adminUser: this.state.adminUser,
            error: this.state.error,
            authToken: this.state.authToken,
            potluckList: this.state.potluckList,
            user: this.state.user,
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
            getAdminUserInPotluck: this.getAdminUserInPotluck,
            setPotluckList: this.setPotluckList,
            setUser: this.setUser,
            clearError: this.clearError,
            showForm: this.state.showForm,
            setShowForm: this.setShowForm,
            setExpanded: this.setExpanded,
            render: this.state.render,
            setRender: this.setRender,
            clearPotluckInList: this.clearPotluckInList

        }
        return(
            <PotluckContext.Provider value = {value}>
                {this.props.children}
            </PotluckContext.Provider>
        )
    }

}