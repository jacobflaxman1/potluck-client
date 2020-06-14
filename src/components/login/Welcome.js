import React from 'react'
import './Welcome.css'
export default function Welcome() {

    return(
        <div className = 'Welcome'>
            <h2 >Welcome to Potluck </h2>
            <p> A space where users can create events and keep track of 
                whose coming and what they're bringing!
            </p>
                <br />
            <p> Make an account or login to begin</p>
        </div>
    )
}