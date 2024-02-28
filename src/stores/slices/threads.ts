import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../types/thread";

const data: Thread[] = [];

const initialState = {
    data,
};

const threadsSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        GET_THREADS: (state, action) => {
            state.data = action.payload.data;
        },
    },
});

export const { GET_THREADS } = threadsSlice.actions;
export default threadsSlice.reducer;
