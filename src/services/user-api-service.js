import config from '../config'
import TokenService from './token-service'

const UserApiService = {
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/users/names`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        })
        .then(res => res.json())
    },
    getUsersByPotluck(id) {
        return fetch(`${config.API_ENDPOINT}/users/names/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },

        })
        .then(res => res.json())
    }
}

export default UserApiService