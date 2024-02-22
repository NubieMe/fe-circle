import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
    },
    reducers: {
        update: (state, action) => {
            state.isLoading = action.payload.isLoading;
        },
    },
});

export const { update: updateLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
