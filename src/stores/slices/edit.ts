import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: "edit",
    initialState: {
        open: false,
    },
    reducers: {
        openEdit: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { openEdit } = editSlice.actions;
export default editSlice.reducer;
