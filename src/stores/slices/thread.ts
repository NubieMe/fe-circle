import { createSlice } from "@reduxjs/toolkit";
import { DetailThread } from "../../types/thread";

const initialState: DetailThread = {
    id: 0,
    content: "",
    image: [],
    likes: [],
    isLiked: false,
    replies: [],
    created_at: "",
    updated_at: "",
    author: {
        id: 0,
        name: "",
        username: "",
        picture: null,
    },
};

const threadsSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {
        GET_THREAD: (state, action) => {
            state.id = action.payload.id;
            state.content = action.payload.content;
            state.image = action.payload.image;
            state.likes = action.payload.likes;
            state.isLiked = action.payload.isLiked;
            state.replies = action.payload.replies;
            state.created_at = action.payload.created_at;
            state.updated_at = action.payload.updated_at;
            state.author = action.payload.author;
        },
    },
});

export const { GET_THREAD } = threadsSlice.actions;
export default threadsSlice.reducer;
