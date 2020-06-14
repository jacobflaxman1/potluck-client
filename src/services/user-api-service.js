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
    },
    getUserNameByUserId(id) {
        return fetch(`${config.API_ENDPOINT}/users/user/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => res.json())
    },

    postFriend(user_id_one, user_id_two) {
        const user_ids = { user_one: user_id_one, user_two: user_id_two}
        console.log(config.API_ENDPOINT)
        return fetch(`${config.API_ENDPOINT}/friends`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(user_ids)
        })
        .then(res => console.log(res))
    }
}

export default UserApiService