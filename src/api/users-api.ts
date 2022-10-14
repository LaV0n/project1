import { instance } from "./instance"
import { UserPageDataType} from "../features/social/users/usersReducer";


export const usersAPI = {
    getUsers(data: UsersGetType) {
        return instance.get<UserPageDataType>(`social/users`,
            {
                params: {
                    userName: data.userName, min: data.min, max: data.max,
                  pageCount: data.pageCount, page: data.page
                }
            })
    },
}


export type UsersGetType = {
    userName?:string
    min?:number
    max?:number
    page?:number
    pageCount?:number
}
