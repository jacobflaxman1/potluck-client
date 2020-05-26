import React, { useContext } from 'react'
import PotluckContext from '../context/PotluckContext'
import './ItemInPotluck.css'
export default function ItemInPotluck(props) {

    const context = useContext(PotluckContext)
    
    let eachItem = props.items.map((element, index) =>  {
        if(element.item_name === '') {
            return null
        }
        if(!element.taken) {
            return (
                <ul className = 'list-ul'>
                    <li key = {index}> 
                        <button onClick = {() => context.updateItem(element.item_id)}> Take Item </button> 
                        {element.item_name}
                    </li>
                </ul>
            ) 
        } 
        else {
            return(
                <ul className = 'list-ul'>
                    <li key = {index}>
                        <div className = 'taken-item'> {element.user_name} is taking </div>
                        {element.item_name}
                    </li>
                </ul>
            )
        }
    })
    return eachItem
}