export type StatusType = 'idle' | 'pending' | 'succeeded' | 'failed'

export type LoginRequestType = {
   email: string
   password: string
   rememberMe: boolean
}
export type RegistrationRequestType = {
   email: string,
   password: string
}
export type AuthResponseDataType = {
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
export type NewPasswordRequestType = {
   password: string
   resetPasswordToken: string
}
export type SortType = '0cardsCount' | '1cardsCount' | '0updated' | '1updated' | '0created' | '1created' | null