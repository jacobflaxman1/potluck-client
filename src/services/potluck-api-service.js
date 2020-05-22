import config from '../config'
import TokenService from './token-service'

const PotluckApiService = {

    getPotlucksByUser() {
        return fetch(`${config.API_ENDPOINT}/potlucks`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    getPotluckById(id) {
        return fetch(`${config.API_ENDPOINT}/potlucks/${id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
        
    }, 
    getItemsInPotluck(potluck_id) {
        return fetch(`http://localhost:8000/api/potlucks/items/${potluck_id}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
    },
    postPotluck(potluck) {
        return fetch(`${config.API_ENDPOINT}/potlucks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(potluck)
        })
        .then(res => res.json())
    },
    deletePotluck(potluck_id) {
        return fetch(`${config.API_ENDPOINT}/potlucks/${potluck_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
        .then(res => console.log(res))
        // .catch(err => console.log(err))
    },

} 

export default PotluckApiService