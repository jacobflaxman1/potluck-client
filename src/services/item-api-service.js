import config from '../config'
import TokenService from './token-service'

const itemApiService = {
    getItemById(item_id) {
        return fetch(`${config.API_ENDPOINT}/items/${item_id}`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => res.json())
    },

    updateItem(item_id) {
        let fetchData = {
            method: 'PATCH',
            headers: 
            {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        }
        // if(typeof item_name !== 'undefined') {
        //     fetchData.body = JSON.stringify({ item_name })
        // }
        console.log(item_id, 'fetch Data')
        return fetch(`${config.API_ENDPOINT}/items/${item_id}`, fetchData)
            .then(res => res.json())
    }
}

export default itemApiService