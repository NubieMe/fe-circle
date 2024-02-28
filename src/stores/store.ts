import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.ts";
import modalReducer from "./slices/modal.ts";
import msgLoginReducer from "./slices/msgLogin.ts";
import msgRegisterReducer from "./slices/msgRegister.ts";
import threadsReducer from "./slices/threads.ts";
import threadReducer from "./slices/thread.ts";
import loadingReducer from "./slices/loading.ts";
import usersReducer from "./slices/users.ts";
import profileReducer from "./slices/userProfile.ts";
import suggestionReducer from "./slices/suggestion.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        msgLogin: msgLoginReducer,
        msgRegister: msgRegisterReducer,
        threads: threadsReducer,
        thread: threadReducer,
        upload: loadingReducer,
        users: usersReducer,
        profile: profileReducer,
        suggestion: suggestionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
