import React from 'react'
import PotluckContext from '../../context/PotluckContext'

export default class FriendsList extends React.Component {

    static contextType = PotluckContext


    //Add friend by username, send username to backend, backend searches users 
    //and returns user id of sent username 
    //insert user id along with userid of currently logged in 


    state = {
        user_two: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.context.addFriend(this.state.user_two)
    }

    render() {
        console.log(this.state.user_two)
        return(
            <div> 
                <form onSubmit = {e => this.handleSubmit(e)}>
                    Add A Friend
                    <input type = 'text' onChange = {e => this.setState({ user_two: e.target.value})} />
                    <input type  = 'submit' /> 
                </form>

            </div> 
        )
    }
}