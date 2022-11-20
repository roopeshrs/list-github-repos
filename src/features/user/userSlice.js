import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userInfo: "",
    userRepos: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.userInfo = action.payload;
        },
        saveRepos: (state, action) => {
            state.userRepos = action.payload;
        }
    }
})

export const {saveUser, saveRepos} = userSlice.actions

export default userSlice.reducer