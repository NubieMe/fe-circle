import { createSlice } from "@reduxjs/toolkit";

const msgLoginSlice = createSlice({
    name: "msgLogin",
    initialState: {
        message: "",
    },
    reducers: {
        update: (state, action) => {
            state.message = action.payload.message;
        },
    },
});

export const { update: updateMsgLogin } = msgLoginSlice.actions;
export default msgLoginSlice.reducer;
