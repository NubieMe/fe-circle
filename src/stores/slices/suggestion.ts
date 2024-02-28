import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../types/user";

const data: users[] = [];

const initialState = {
    data,
};

const suggestionSlice = createSlice({
    name: "suggestion",
    initialState,
    reducers: {
        GET_SUGGEST: (state, action) => {
            state.data = action.payload.data;
        },
    },
});

export const { GET_SUGGEST } = suggestionSlice.actions;
export default suggestionSlice.reducer;
