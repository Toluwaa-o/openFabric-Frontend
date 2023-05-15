import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://openfabric-backend-rtee.onrender.com/api/v1',
    withCredentials: true
})

export default instance