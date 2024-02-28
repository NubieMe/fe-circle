import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: 0,
        username: "",
        name: "",
        picture: null,
        cover: null,
        bio: null,
        follower: [{ id: 0, following: { id: 0 } }],
        following: [{ id: 0, follower: { id: 0 } }],
    },
    reducers: {
        update: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.picture = action.payload.picture;
            state.cover = action.payload.cover;
            state.bio = action.payload.bio;
            state.follower = action.payload.follower;
            state.following = action.payload.following;
        },
    },
});

export const { update: updateUser } = userSlice.actions;
export default userSlice.reducer;
