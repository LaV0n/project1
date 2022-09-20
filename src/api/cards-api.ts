import axios from 'axios'

export const _instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

type RegistrationType= {email: string, password: string}

export const cardsAPI = {
    registration(data:RegistrationType) {
        return _instance.post('/auth/register', data)
    }
}

