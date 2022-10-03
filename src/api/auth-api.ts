import { LoginRequestType, AuthResponseDataType, NewPasswordRequestType, RegistrationRequestType } from "../common/types"
import { instance } from "./instance"

export const authAPI = {
   me() {
      return instance.post<AuthResponseDataType>('auth/me')
   },
   logout() {
      return instance.delete('auth/me')
   },
   login(data: LoginRequestType) {
      return instance.post<AuthResponseDataType>('auth/login', data)
   },
   registration(data: RegistrationRequestType) {
      return instance.post('/auth/register', data)
   },
   newPassword(data: NewPasswordRequestType) {
      return instance.post('auth/set-new-password', data)
   },
   restorePassword(email: string) {
      return instance.post('auth/forgot', {
         email,
         from: "test-front-admin <ai73a@yandex.by>",
         message: `<div style="background-color: lime; padding: 15px">
                   password recovery link: 
                   <a href='https://lav0n.github.io/project1/#/newpassword/$token$'>
                   link</a>
                   </div>`
      })
   },
   changeName(name: string) {
      return instance.put<{ updatedUser: AuthResponseDataType }>('auth/me', {
         name,
         avatar: "https://www.placecage.com/c/140/200"
      })
   },
}