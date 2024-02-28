import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../types/user";

const data: users[] = [];

const initialState = {
    data,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        GET_USERS: (state, action) => {
            state.data = action.payload.data;
        },
    },
});

export const { GET_USERS } = usersSlice.actions;
export default usersSlice.reducer;
