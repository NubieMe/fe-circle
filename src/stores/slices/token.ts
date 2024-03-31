import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        cookie: false,
    },
    reducers: {
        GET_TOKEN: (state, action) => {
            state.cookie = action.payload;
        },
    },
});

export const { GET_TOKEN } = tokenSlice.actions;
export default tokenSlice.reducer;
