import axios from "axios"
import { _instance } from "../../api/cards-api"

export const loginAPI = {
   login(data: LoginRequestDataType) {
      return _instance.post<LoginResponseDataType>('auth/login', data)
   }
}
export type LoginRequestDataType = {
   email: string
   password: string
   rememberMe: boolean
}
export type LoginResponseDataType = {
   _id: string;
   email: string;
   name: string;
   avatar?: string;
   publicCardPacksCount: number;
   created: Date;
   updated: Date;
   isAdmin: boolean;
   verified: boolean;
   rememberMe: boolean;
   error?: string;
}