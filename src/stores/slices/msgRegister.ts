import { createSlice } from "@reduxjs/toolkit";

const msgRegisterSlice = createSlice({
    name: "msgRegister",
    initialState: {
        message: "",
    },
    reducers: {
        update: (state, action) => {
            state.message = action.payload.message;
        },
    },
});

export const { update: updateMsgRegister } = msgRegisterSlice.actions;
export default msgRegisterSlice.reducer;
