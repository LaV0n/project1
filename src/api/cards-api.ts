import { instance } from "./instance"
import { DataType } from "../features/cards/cardsReducer";

export const cardsAPI = {
    addCard(card: AddNewCardRequestType) {
        return instance.post('cards/card', { card })
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
    addGrade(grade: number, cardId: string) {
        return instance.put('cards/grade', { grade: grade, card_id: cardId })
    }
}
export type AddNewCardRequestType = {
    cardsPack_id: string,
    question: string,
    answer: string,
    //optional
    grade?: number,
    shots?: number,
    answerImg?: string,
    questionImg?: string,
    questionVideo?: string,
    answerVideo?: string,
}
export type EditCardRequestType = {
    _id: string
    comments?: string
} & Pick<AddNewCardRequestType, 'question' | 'answer'>
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
