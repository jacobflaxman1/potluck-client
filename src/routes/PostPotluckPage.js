import React from 'react'
import PostPotluckForm from '../components/PostPotluckForm'

export default class PostPotluckPage extends React.Component {

    render() {
        return(
            <div className = 'post-potluck-page'>
                <PostPotluckForm {...this.props}/>
            </div>
        )
    }
}