import {
  configureStore,
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
  combineReducers,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import authReducer, { logoutUser } from "./redux/auth.slice";
import { necttaAdminApi } from "./redux/api.slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { toast } from "react-toastify";
import capitalize from "./helpers/capitalize";
import { NECTTA_ADMIN_USER } from "./constants";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.data?.message?.toLowerCase() === "jwt expired") {
      api.dispatch(logoutUser());
      return;
    } else if (action?.payload?.status === 500) {
      toast.error("Something went wrong");
    }
    // else if (action?.payload?.status === 401) {
    //   // api.dispatch(logoutUser());
    //   toast.error(capitalize(action?.payload?.data?.message as string) ?? "Something went wrong");
    //   return;
    // }
    else {
      toast.error(capitalize(action?.payload?.data?.message as string) ?? "Something went wrong");
    }
  }

  return next(action);
};

const appReducer = combineReducers({
  auth: authReducer,
  [necttaAdminApi.reducerPath]: necttaAdminApi.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logoutUser") {
    if (typeof window !== undefined) {
      localStorage.removeItem(NECTTA_ADMIN_USER);
    }
    necttaAdminApi.util.resetApiState();
    window.location.replace("/login");

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    })
      .concat(necttaAdminApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
