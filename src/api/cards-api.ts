import { instance } from "./instance"
import { DataType } from "../features/cards/cardsReducer";

export const cardsAPI = {
    getCards(id: string, min?: number, max?: number, page?: number, pageCount?: number, cardQuestion?: string) {
        return instance.get<DataType>(`cards/card?cardsPack_id=${id}`)
    },
    addCard(id: string) {
        const card = {
            cardsPack_id: id,
            question: "34 question",
            answer: "22 answer",
            grade: 2,
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
        return instance.get<DataType>(`cards/card?cardsPack_id=${idPack}&sortCards=${direction}${value}`)
    },
    findQuestion(id: string, cardQuestion: string) {
        return instance.get<DataType>(`cards/card?cardsPack_id=${id}&cardQuestion=${cardQuestion}`)
    }
}
export type EditCardRequestType = {
    _id: string,
    question: string
    answer: string
    comments?: string
}