import { createSlice } from "@reduxjs/toolkit";

const pictureSlice = createSlice({
    name: "picture",
    initialState: {
        open: false,
    },
    reducers: {
        openPicture: (state, action) => {
            state.open = action.payload;
        },
    },
});

export const { openPicture } = pictureSlice.actions;
export default pictureSlice.reducer;
