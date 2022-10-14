import { instance } from "./instance"
import { UserPageDataType} from "../features/social/users/usersReducer";

export const usersAPI = {getUsers(data: UsersGetType) {
        return instance.get<UserPageDataType>(`social/users`,
            {
                params: {
                    userName: data.userName, min: data.min, max: data.max,
                    pageCount: data.pageCount, page: data.page
                }
            })
    }, getUserProfile(id:string){
        return instance.get(`social/user?id=${id}`)
    }}


export type UsersGetType = {
    userName?:string
    min?:number
    max?:number
    page?:number
    pageCount?:number
}
