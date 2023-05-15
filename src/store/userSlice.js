import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        allUsers: null,
        user: null
    },
    reducers: {
        getAllUsers(state, action) {
            state.allUsers = action.payload
        },
        getUser(state, action) {
            state.user = action.payload
        }
    }
})

export const userActions = userSlice.actions
export default userSlice