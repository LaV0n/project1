import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {

    }
}
export const _instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})
export const cardsAPI = {

}