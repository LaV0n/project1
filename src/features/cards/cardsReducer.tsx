import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatchType} from "../../app/store";
import {cardsAPI} from "../../api/cards-api";

const CardsData = {
    cards: [] as CardsType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
    status: false
}

export  type CardsType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg: string
    answerImg: string
    answerVideo: string
    questionVideo: string
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}

type CardsDataType = typeof CardsData

const slice = createSlice({
    name: 'cards',
    initialState: CardsData,
    reducers: {
        getCardsData(state, action: PayloadAction<{ data: CardsDataType }>) {
            state.cards = action.payload.data.cards
            state.page = action.payload.data.page
            state.pageCount = action.payload.data.pageCount
            state.minCardsCount = action.payload.data.minCardsCount
            state.maxCardsCount = action.payload.data.maxCardsCount
            state.cardPacksTotalCount = action.payload.data.cardPacksTotalCount
            state.packUserId = action.payload.data.packUserId
        },
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        }
    }
})

export const cardsReducer = slice.reducer

export const {getCardsData, setStatus} = slice.actions

export const getCardsTC = (id: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({status: true}))
    try {
        const response = await cardsAPI.getCards(id)
        dispatch(getCardsData({data: response.data}))
        dispatch(setStatus({status: false}))
    } catch (err) {
        alert(err)
    }
}

export const addNewCardTC = (packId: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({status: true}))
    try {
        await cardsAPI.addCard(packId)
        dispatch(getCardsTC(packId))
        dispatch(setStatus({status: false}))
    } catch (err) {
        alert(err)
    }
}

export const deleteCardTC = (cardId: string, packId: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({status: true}))
    try {
        await cardsAPI.deleteCard(cardId)
        dispatch(getCardsTC(packId))
        dispatch(setStatus({status: false}))
    } catch (err) {
        alert(err)
    }
}

export const editCardTC = (cardId: string, packId: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({status: true}))
    try {
        await cardsAPI.editCard(cardId)
        dispatch(getCardsTC(packId))
        dispatch(setStatus({status: false}))
    } catch (err) {
        alert(err)
    }
}