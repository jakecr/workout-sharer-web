import axios from 'axios'

export default axios.create({
    baseURL: 'https://workout-sharer.herokuapp.com'
})