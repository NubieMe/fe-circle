import { createSlice } from "@reduxjs/toolkit";

const coverSlice = createSlice({
    name: "cover",
    initialState: {
        open: false,
    },
    reducers: {
        openCover: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { openCover } = coverSlice.actions;
export default coverSlice.reducer;
