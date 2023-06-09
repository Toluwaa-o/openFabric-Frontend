import { createSlice, current } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showEdit: false,
        showAdd: false,
        showRev: false,
        doneMsg: false,
        isError: false
    },
    reducers: {
        toggleEdit(state) {
            state.showEdit = !state.showEdit
        },
        toggleAdd(state) {
            state.showAdd = !state.showAdd
        },
        toggleRev(state) {
            state.showRev = !state.showRev
        },
        setMessage(state, action) {
            state.doneMsg = action.payload
            
        },
        setIsError(state, action) {
            state.isError = action.payload
            
        }
    }
})

export const uiActions = uiSlice.actions
export default uiSlice