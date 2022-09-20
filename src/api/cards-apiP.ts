import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {}
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})
export const cardsAPI = {
    me() {
        return instance.post('auth/me')
    },
    logout() {
        return instance.delete('auth/me')
    },
    login() {
        return instance.post('auth/login', {
            "email": "nya-admin@nya.nya",
            "password": "1qazxcvBG",
            "rememberMe": false
        })
    },
    registration(){
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/register',{"email": "leonidmedica@gmail.com",
            "password": "1234qwerty"})
    },
    changeName(name: string) {
        return instance.put('auth/me', {
            "name": name,
            "avatar": "https://www.placecage.com/c/140/200"
        })
    },
    restorePassword(email: string) {
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
            email: email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
        password recovery link: 
        <a href='http://localhost:3000/newpassword/$token$'>
        link</a>
        </div>`
        })
    },
    newPassword(password:string,token:string){
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password',{
            "password": password,
            "resetPasswordToken":token
        })
    }
}