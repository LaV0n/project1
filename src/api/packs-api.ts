import { instance } from './instance';
export const packsAPI = {
   getPacks: (params: GetPacksRequestType) => {
      return instance.get<PacksDataType>('/cards/pack', { params })
   },
   createNewPack: (cardsPack: CreateNewPackRequestType) => {
      return instance.post('/cards/pack', { cardsPack })
   },
   deletePack: (id: string) => {
      return instance.delete(`/cards/pack?id=${id}`)
   },
   updatePackName: (cardsPack: UpdatePackNameRequestType) => {
      return instance.put('/cards/pack', { cardsPack })
   },
}
type GetPacksRequestType = {
   page: number
   pageCount: number
   min: number | null
   max: number | null
   packName: string | null
   sortPacks: string | null
   user_id: string | null
   //then

   block?: boolean
}
export type CreateNewPackRequestType = {
   name: string
   private: boolean
   deckCover?: string | null
}
export type UpdatePackNameRequestType = {
   _id: string
   name: string
   private: boolean
}
export type PackType = {
   _id: string
   user_id: string
   name: string
   cardsCount: number
   created: Date
   updated: Date
   user_name: string
   deckCover: string
}
export type PacksDataType = {
   cardPacks: PackType[]
   cardPacksTotalCount: number
   maxCardsCount: number
   minCardsCount: number
   page: number
   pageCount: number
}