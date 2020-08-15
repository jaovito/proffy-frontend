import axios from 'axios'

const api = axios.create({
    baseURL: 'https://proffys-web.herokuapp.com'
})

export default api