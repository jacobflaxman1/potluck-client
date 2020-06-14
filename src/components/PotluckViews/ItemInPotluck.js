import React, { useContext } from 'react'
import PotluckContext from '../../context/PotluckContext'
import './ItemInPotluck.css'
export default function ItemInPotluck(props) {

    const context = useContext(PotluckContext)
    
    let eachItem = props.items.map((element, index) =>  {
        if(element.item_name === '') {
            return null
        }
        if(!element.taken) {
            return (
                    <li key = {index} className = 'not-taken'> 
                        <button className = 'button-take' onClick = {() => context.updateItem(element.item_id)}> Bring {element.item_name}
                        </button> 
                    </li>
   
            ) 
        } 
        else {
            return(
                    <li key = {index}>
                        <div className = 'taken-item'> <span className = 'user-taking'> {element.user_name} </span> is bringing {element.item_name} </div>
                    </li>
            )
        }
    })
    return eachItem
}