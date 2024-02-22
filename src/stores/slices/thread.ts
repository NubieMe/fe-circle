import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../libs/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Thread } from "../../types/thread";

const initialState: Thread[] = [];

const threadsSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        GET_THREADS: (_, action) => {
            const threads: Thread[] = action.payload.map((data: Thread) => {
                return {
                    id: data.id,
                    content: data.content,
                    image: data.image,
                    likes: data.likes,
                    isLiked: data.isLiked,
                    replies: data.replies,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    author: {
                        id: data.author.id,
                        name: data.author.name,
                        username: data.author.username,
                        picture: data.author.picture,
                    },
                };
            });
            return threads;
        },
    },
});

export const { GET_THREADS } = threadsSlice.actions;
export default threadsSlice.reducer;
