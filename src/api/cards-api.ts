import {_instance} from "./_instance"

export const cardsAPI = {
    getCards(id:string) {
        return _instance.get(`cards/card?cardsPack_id=${id}`)
    },
    addCard(id:string){
        const card ={
            cardsPack_id: id,
            question: "test question" ,
            answer: "test answer",
            grade: 3,
            shots: 0,
            answerImg: "url or base 64",
            questionImg: "url or base 64",
            questionVideo: "url or base 64",
            answerVideo: "url or base 64" ,
        }
        return _instance.post('cards/card',{card:card})
    },
    deleteCard(id:string){
        return _instance.delete(`cards/card?id=${id}`)
    },
    editCard(id:string){
        const card ={
            _id: id,
            question: 'new question',
            comments: "new comments"
        }
        return _instance.put('cards/card',{card:card})
    }
}