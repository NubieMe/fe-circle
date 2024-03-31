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
import followReducer from "./slices/follow.ts";
import editReducer from "./slices/edit.ts";
import tokenReducer from "./slices/token.ts";
import coverReducer from "./slices/cover.ts";
import pictureReducer from "./slices/picture.ts";

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
        follow: followReducer,
        edit: editReducer,
        token: tokenReducer,
        cover: coverReducer,
        picture: pictureReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
