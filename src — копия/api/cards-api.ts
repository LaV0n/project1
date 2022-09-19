import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {

    }
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})
export const cardsAPI ={
    registration(email: string, password: string){
        return instance.post('/auth/register',{email,password})
    }
}