import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        showEdit: false,
        showAdd: false,
        showRev: false
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
        }
    }
})

export const uiActions = uiSlice.actions
export default uiSlice