import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../types/thread";
import API from "../../libs/api";

export const fetchThreads = createAsyncThunk<Thread[], void, { rejectValue: string }>(
    "thread/fetchThreads",
    async (_, thunkAPI) => {
        try {
            const response = await API.get(`/thread`);
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

const initialState: { data: Thread[]; isLoading: boolean; isError: boolean } = {
    data: [],
    isLoading: false,
    isError: false,
};

const threadsSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        setThreads: (state, action: PayloadAction<Thread[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThreads.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchThreads.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchThreads.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.data = [];
        });
    },
});

export const { setThreads } = threadsSlice.actions;
export default threadsSlice.reducer;
