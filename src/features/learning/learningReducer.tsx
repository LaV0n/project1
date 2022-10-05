import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardsType} from "../cards/cardsReducer";
import {cardsAPI} from "../../api/cards-api";
import {errorAsString} from "../../common/utils/errorAsString";


const initialState = {
    data: [] as CardsType[],
    packName: '',
    notice: '',
    status: false,
    initialized: false,
    sortStepByStep: false
}

const slice = createSlice({
    name: 'learning',
    initialState,
    reducers: {
        setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setFilter(state, action: PayloadAction<{ filter: boolean }>) {
            state.sortStepByStep = action.payload.filter
        },
    },
    extraReducers: builder => {
        builder.addCase(getAllCardsTC.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.packName = action.payload.packName
            state.initialized = true
            state.status = false
        })
        builder.addCase(getAllCardsTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(changeGradeCardTC.fulfilled, (state, action) => {
            const card = state.data.find(c => c._id === action.payload.cardId)
            if (card) {
                card.shots = action.payload.shots
                card.grade = action.payload.grade
            }
            state.status = false
        })
        builder.addCase(changeGradeCardTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
    }
})
export const learningReducer = slice.reducer
export const {setStatus, setFilter, setErrorNotice} = slice.actions

export const getAllCardsTC = createAsyncThunk<{ data: CardsType[], packName: string }, string, { rejectValue: { error: string } }>
('learning/getAllCards', async (id, {dispatch, rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        const res = await cardsAPI.getCards({cardsPack_id: id, pageCount: 100})
        return {data: res.data.cards, packName: res.data.packName}
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

export const changeGradeCardTC = createAsyncThunk<{ cardId: string, grade: number, shots: number }, ChangeGradeType, { rejectValue: { error: string } }>
('learning/changeGrade', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        const res = await cardsAPI.addGrade(param.grade, param.idCard)
        return {
            cardId: res.data.updatedGrade.card_id,
            grade: res.data.updatedGrade.grade,
            shots: res.data.updatedGrade.shots
        }
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

type ChangeGradeType = {
    idCard: string
    grade: number
}
