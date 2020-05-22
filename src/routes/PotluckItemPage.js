import React, { Component } from 'react'
import PotluckContext from '../context/PotluckContext'
import PotluckApiService from '../services/potluck-api-service'
import ItemInPotluck from '../components/ItemInPotluck'
import './PotluckItemPage.css'
export default class PotluckItemPage extends Component {

    static contextType = PotluckContext

    componentDidMount() {
        const potluck_id = this.props.match.params

        PotluckApiService.getItemsInPotluck(Object.values(potluck_id)[0])
            .then(this.context.setItems)
            .catch(this.context.setError)
        PotluckApiService.getPotluckById(Object.values(potluck_id)[0])
            .then(this.context.setPotluck)
            .catch(this.context.setError)
    }

    deletePotluck = () => {
        const potluck_id = this.props.match.params
        PotluckApiService.deletePotluck(Object.values(potluck_id)[0])
            .then(this.context.clearPotluck)
            .then(() => this.props.history.push('/'))
    }

    renderPotluck() {
        const { potluck } = this.context
        return (
            <>
                <PotluckExpandedContent potluck = {potluck} />
            </>
        )
    }
    
    renderItemsInPotluck() {
        const { items, taken } = this.context
        return (
            <ItemInPotluck 
            items = {items}
            taken = {taken}

            />
        )
    }
    render() {
        const { items } = this.context
        console.log('items',items[0])
        return(
            <div className = 'potluck-items'>
                <div className = 'potluck-div'>
                     {this.renderPotluck()}
                </div>
                <div className = 'items-div'>
                    {( items.item_name === 'undefined') ? <h2>Items</h2> : null}
                    {this.renderItemsInPotluck()}
                </div>
                <button onClick = {this.deletePotluck}> Delete </button>
            </div>
        )
    }
}

function PotluckExpandedContent({ potluck }) {
    return (
        <div className = 'potluck-expanded-name'> 
            {potluck.potluck_name}
        </div>
    )
}