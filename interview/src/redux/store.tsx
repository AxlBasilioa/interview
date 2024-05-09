import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { RequestApi } from "./services/apiRequest";
import { RequestDelete } from "./services/apiDelete";
import alertReducer from "./features/alertSlice";
import formReducer from "./features/formSlice";
import editReducer from './features/editSlice';
import { PostApi } from "./services/apiPost";
import { requireUpdate } from "./services/apiUpdate";
export const store = configureStore({
    // adding reducers
    reducer:{
        alert:alertReducer,
        form:formReducer,
        edit:editReducer,
        // adding the reducer for queries add and rm
        [RequestApi.reducerPath]:RequestApi.reducer,
        [RequestDelete.reducerPath]:RequestDelete.reducer,
        [PostApi.reducerPath]:PostApi.reducer,
        [requireUpdate.reducerPath]:requireUpdate.reducer
    },
    //adding my middleware ->
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat([RequestApi.middleware, RequestDelete.middleware, PostApi.middleware, requireUpdate.middleware]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;