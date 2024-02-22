import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        open: false,
    },
    reducers: {
        update: (state, action) => {
            state.open = action.payload.open;
        },
    },
});

export const { update: updateModal } = modalSlice.actions;
export default modalSlice.reducer;
