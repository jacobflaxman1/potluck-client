import React from 'react'
import PostPotluckForm from '../components/PostPotluckForm/PostPotluckForm'
import PotluckContext from '../context/PotluckContext'
import './PostPotluckPage.css'

export default class PostPotluckPage extends React.Component {

    static contextType = PotluckContext
    
    componentDidMount() {
        this.context.getAllUserNames()
    }


    render() {
        return(
            <div className = 'post-potluck-page'>
                <PostPotluckForm {...this.props}/>
            </div>
        )
    }
}