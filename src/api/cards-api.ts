import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {

    }
}
const instance = axios.create({
    baseURL: '',
    ...settings
})
export const cardsAPI ={

}