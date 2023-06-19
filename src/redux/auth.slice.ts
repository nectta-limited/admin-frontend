import { IUser } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { necttaAdminApi } from "./api.slice";

type AuthState = {
  // user: IUser | null;
  user: string | null | undefined;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
