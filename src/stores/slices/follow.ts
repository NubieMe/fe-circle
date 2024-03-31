import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../types/user";

const following: users[] = [];
const follower: users[] = [];

const initialState = {
    following,
    follower,
};

const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        GET_FOLLOW: (state, action) => {
            state.following = action.payload.following;
            state.follower = action.payload.follower;
        },
    },
});

export const { GET_FOLLOW } = followSlice.actions;
export default followSlice.reducer;
