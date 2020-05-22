import React, { useContext } from 'react'
import PotluckContext from '../context/PotluckContext'
export default function ItemInPotluck({ items }) {

    const context = useContext(PotluckContext)

    let eachItem = items.map(element =>  {
        console.log(element)
        if(element.item_name === '') {
            return null
        }
        if(!element.taken) {
            return (
                <ul>
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
                        <button onClick = {() => context.updateItem(element.item_id)}> Un-Take Item </button>
                    </li>
                </ul>
            )
        }
    })
    return eachItem
}