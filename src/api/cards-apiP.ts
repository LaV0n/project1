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
    me(){
        return instance.post('auth/me')
    },
    logout(){
        return instance.delete('auth/me')
    },
    login(){
        return instance.post('auth/login',{"email": "nya-admin@nya.nya" ,
            "password": "1qazxcvBG" ,
            "rememberMe": false })
    },
    changeName(name:string){
        return instance.put('auth/me',{"name": name,
            "avatar": "https://www.placecage.com/c/140/200"})
    }
}