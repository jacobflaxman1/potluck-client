import React, { useContext } from 'react'
import PotluckContext from '../context/PotluckContext'
export default function ItemInPotluck(props) {

    const context = useContext(PotluckContext)
    //UPDATE TAKEN BY WITH USER WHO TOOK THE ITEM
    //BACKEND SHOULD SEND BACK ITEM AND USERNAME OF WHO TOOK THE ITEM
    let eachItem = props.items.map(element =>  {
        if(element.item_name === '') {
            return null
        }
        if(!element.taken) {
            return (
                <ul className = 'list-ul'>
                    <li key = {element.item_id}> {element.item_name}
                        <button onClick = {() => context.updateItem(element.item_id)}> Take Item </button> 
                    </li>
                </ul>
            ) 
        } 
        else {
            return(
                <ul>
                    <li key = {element.item_id} > {element.item_name}
                        <button disabled> Taken By:  </button>
                    </li>
                </ul>
            )
        }
    })
    return eachItem
}