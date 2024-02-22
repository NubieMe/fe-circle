import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.ts";
import modalReducer from "./slices/modal.ts";
import msgLoginReducer from "./slices/msgLogin.ts";
import msgRegisterReducer from "./slices/msgRegister.ts";
import threadReducer from "./slices/thread.ts";
import loadingReducer from "./slices/loading.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        msgLogin: msgLoginReducer,
        msgRegister: msgRegisterReducer,
        threads: threadReducer,
        upload: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
