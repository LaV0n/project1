import {_instance} from "./_instance"
import {DataType} from "../features/cards/cardsReducer";

export const cardsAPI = {
    addCard(id: string) {
        const card = {
            cardsPack_id: id,
            question: "NEW question",
            answer: "NEW answer",
            grade: 2,
            shots: 0,
            answerImg: "url or base 64",
            questionImg: "url or base 64",
            questionVideo: "url or base 64",
            answerVideo: "url or base 64",
        }
        return _instance.post('cards/card', {card: card})
    },
    deleteCard(id: string) {
        return _instance.delete(`cards/card?id=${id}`)
    },
    editCard(id: string) {
        const card = {
            _id: id,
            question: 'UPDATE question',
            comments: "Update comments"
        }
        return _instance.put(`cards/card`, {card: card})
    },
    sortData(idPack: string, direction: number, value: string) {
        return _instance.get<DataType>(`cards/card?cardsPack_id=${idPack}&sortCards=${direction}${value}`)
    },
    getCards(data: CardGetType) {
        return _instance.get<DataType>(`cards/card`,
            {
                params: {
                    cardsPack_id: data.cardsPack_id, min: data.min, max: data.max,
                    cardQuestion: data.cardQuestion, pageCount: data.pageCount, page: data.page
                }
            })
    },
}

export type CardGetType = {
    cardsPack_id: string
    min?: number | null
    max?: number | null
    page?: number | null
    pageCount?: number | null
    cardQuestion?: string | null
}
