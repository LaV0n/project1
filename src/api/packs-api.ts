import { _instance } from './_instance';
export const packsAPI = {
   getPacks: (params: GetPacksRequestType) => {
      return _instance.get<PacksDataType>('/cards/pack', { params })
   },
   createNewPack: (cardsPack: CreateNewPackRequestType) => {
      return _instance.post('/cards/pack', { cardsPack })
   },
   deletePack: (id: string) => {
      return _instance.delete(`/cards/pack?id=${id}`)
   },
   updatePackName: (cardsPack: UpdatePackNameRequestType) => {
      return _instance.put('/cards/pack', { cardsPack })
   },
}
type GetPacksRequestType = {
   page: number
   pageCount: number
   min?: number
   max?: number
   packName?: string
   block?: boolean
   //then
   sortPacks?: string
   user_id?: string
}
export type CreateNewPackRequestType = {
   name: string
   deckCover?: string | null
   private?: boolean
}
export type UpdatePackNameRequestType = {
   _id: string
   name: string
}
export type PackType = {
   _id: string
   user_id: string
   name: string
   cardsCount: number
   created: Date
   updated: Date
   user_name: string
}
export type PacksDataType = {
   cardPacks: PackType[]
   cardPacksTotalCount: number
   maxCardsCount: number
   minCardsCount: number
   page: number
   pageCount: number
}