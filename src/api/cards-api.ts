import { instance } from "./instance"
import { DataType } from "../features/cards/cardsReducer";

export const cardsAPI = {
    addCard(id: string) {
        const card = {
            cardsPack_id: id,
            question: "Ultimate Question of Life, The Universe, and Everything",
            answer: "42",
            grade: 5,
            shots: 0,
            answerImg: "url or base 64",
            questionImg: "url or base 64",
            questionVideo: "url or base 64",
            answerVideo: "url or base 64",
        }
        return instance.post('cards/card', { card: card })
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    editCard(card: EditCardRequestType) {
        return instance.put(`cards/card`, { card })
    },
    sortData(idPack: string, direction: number, value: string) {
        return instance.get<DataType>(`cards/card`, {
            params: {
                cardsPack_id: idPack, sortCards: direction + value
            }
        })
    },
    getCards(data: CardGetType) {
        return instance.get<DataType>(`cards/card`,
            {
                params: {
                    cardsPack_id: data.cardsPack_id, min: data.min, max: data.max,
                    cardQuestion: data.cardQuestion, pageCount: data.pageCount, page: data.page,
                    sortCards: `${data.direction}${data.value}`
                }
            })
    },
}
export type EditCardRequestType = {
    _id: string
    question: string
    answer: string
    comments?: string
}
export type CardGetType = {
    cardsPack_id: string
    min?: number | null
    max?: number | null
    page?: number | null
    pageCount?: number | null
    cardQuestion?: string | null
    direction?: number | null
    value?: string | null
}
