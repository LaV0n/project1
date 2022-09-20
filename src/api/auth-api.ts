import { LoginRequestType, AuthResponseDataType, NewPasswordRequestType, RegistrationRequestType } from "../common/types"
import { _instance } from "./_instance"

export const authAPI = {
   me() {
      return _instance.post<AuthResponseDataType>('auth/me')
   },
   logout() {
      return _instance.delete('auth/me')
   },
   login(data: LoginRequestType) {
      return _instance.post<AuthResponseDataType>('auth/login', data)
   },
   registration(data: RegistrationRequestType) {
      return _instance.post('/auth/register', data)
   },
   newPassword(data: NewPasswordRequestType) {
      return _instance.post('auth/set-new-password', data)
   },
   restorePassword(email: string) {
      return _instance.post('auth/forgot', {
         email,
         from: "test-front-admin <ai73a@yandex.by>",
         message: `<div style="background-color: lime; padding: 15px">
                   password recovery link: 
                   <a href='http://localhost:3000/newpassword/$token$'>
                   link</a>
                   </div>`
      })
   },
   changeName(name: string) {
      return _instance.put<{ updatedUser: AuthResponseDataType }>('auth/me', {
         name,
         avatar: "https://www.placecage.com/c/140/200"
      })
   },
}