import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userProfile } from "../../types/user";
import API from "../../libs/api";

export const fetchProfile = createAsyncThunk<userProfile, string, { rejectValue: string }>(
    "profile/fetchProfile",
    async (username, thunkAPI) => {
        try {
            const response = await API.get(`/user/${username}`);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue(
                    (error as unknown as { response: { data: { message: string } } }).response.data.message
                );
            }
        }
    }
);

const initialState: { data: userProfile; isLoading: boolean; isError: boolean } = {
    data: {
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
    },
    isLoading: false,
    isError: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        GET_PROFILE: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchProfile.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const { GET_PROFILE } = profileSlice.actions;
export default profileSlice.reducer;
