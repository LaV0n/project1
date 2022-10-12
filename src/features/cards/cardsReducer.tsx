import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AppRootStateType} from "../../app/store";
import {AddNewCardRequestType, CardGetType, cardsAPI, EditCardRequestType} from "../../api/cards-api";
import {AxiosError} from "axios";
import {packsAPI, UpdatePackNameRequestType} from "../../api/packs-api";
import {errorAsString} from "../../common/utils/errorAsString";

export type DataType = typeof Data
export type CardsType = {
    answer: string
    answerImg: string | null
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string | null
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

const Data = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packCreated: '',
    packDeckCover: '',
    packName: '',
    packPrivate: false,
    packUpdated: '',
    packUserId: '',
    page: 0,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0
}

const initialState = {
    data: Data,
    status: false,
    notice: '',
    page: 1,
    pageCount: 5
}

const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getCardsTC.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = false
        })
        builder.addCase(getCardsTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(addNewCardTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(deleteCardTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(editCardTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(dataSortTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
    }
})

export const cardsReducer = slice.reducer

export const { setStatus, setErrorNotice, setPageCount, setPage} = slice.actions

export const getCardsTC = createAsyncThunk<DataType, CardGetType,{rejectValue: {error: string}}>
('cards/getCards', async (data, {
    dispatch,    getState,    rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        const state = getState() as AppRootStateType
        const response = await cardsAPI.getCards({...data, pageCount: state.cards.pageCount, page: state.cards.page})
        return  response.data
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

export const addNewCardTC = createAsyncThunk<unknown,AddNewCardRequestType,{rejectValue: {error: string}}>
('cards/addCard',async (card,{dispatch,rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        await cardsAPI.addCard(card)
        dispatch(getCardsTC({cardsPack_id: card.cardsPack_id}))
        dispatch(setStatus({status: false}))
        return true
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

export const deleteCardTC = createAsyncThunk<unknown,DeleteDataType,{rejectValue: {error: string}}>
('cards/deleteCard',async (data ,{dispatch,rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        await cardsAPI.deleteCard(data.cardId)
        dispatch(getCardsTC({cardsPack_id: data.packId}))
        dispatch(setStatus({status: false}))
        return true
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

export const editCardTC = createAsyncThunk<unknown,EditDataType,{rejectValue: {error: string}}>
('cards/editCard',async (data,{dispatch,rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        await cardsAPI.editCard(data.card)
        dispatch(getCardsTC({cardsPack_id: data.packId}))
        dispatch(setStatus({status: false}))
        return true
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

export const dataSortTC = createAsyncThunk<unknown,DataSortType,{rejectValue: {error: string}}>
('cards/dataSort',async (data,{dispatch,rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        await dispatch(getCardsTC({cardsPack_id: data.packId, direction: data.direction, value: data.value}))
        dispatch(setStatus({status: false}))
        return true
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

export const editPackNameFromCards = createAsyncThunk<unknown, UpdatePackNameRequestType, { rejectValue: { error: string } }>(
    'cards/editPackName',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            await packsAPI.updatePackName(data)
        } catch (err: any) {
            const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
            dispatch(setErrorNotice({notice: error}))
            return rejectWithValue({error})
        }
    }
)
export const deletePackFromCards = createAsyncThunk<unknown, string, { rejectValue: { error: string } }>(
    'cards/deletePack',
    async (id, {dispatch, rejectWithValue}) => {
        try {
            await packsAPI.deletePack(id)
        } catch (err: any) {
            const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
            dispatch(setErrorNotice({notice: error}))
            return rejectWithValue({error})
        }
    }
)

type DeleteDataType={
    cardId: string
    packId: string
}
type EditDataType={
    card: EditCardRequestType
    packId: string
}
type DataSortType={
    packId: string
    direction: number
    value: string
}