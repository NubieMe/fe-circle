import { createSlice } from "@reduxjs/toolkit";
import { userProfile } from "../../types/user";

const initialState: userProfile = {
    id: 0,
    name: "",
    username: "",
    email: "",
    picture: "",
    cover: "",
    bio: "",
    created_at: "",
    following: [],
    follower: [],
    threads: [],
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        GET_PROFILE: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.picture = action.payload.picture;
            state.cover = action.payload.cover;
            state.bio = action.payload.bio;
            state.created_at = action.payload.created_at;
            state.following = action.payload.following;
            state.follower = action.payload.follower;
            state.threads = action.payload.threads;
        },
    },
});

export const { GET_PROFILE } = profileSlice.actions;
export default profileSlice.reducer;
