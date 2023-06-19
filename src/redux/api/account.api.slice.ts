import { IUser } from "@/types/user";
import { necttaAdminApi } from "../api.slice";
import { IChangePasswordRequest, ILoginUserRequest, IRegisterUserResponse } from "@/types/account";

export const accountApiSlice = necttaAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, ILoginUserRequest>({
      query: (data) => ({
        url: `auth/school/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerUser: builder.mutation<IRegisterUserResponse, ILoginUserRequest>({
      query: (data) => ({
        url: `auth/school/register`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<unknown, IChangePasswordRequest>({
      query: (data) => ({
        url: `auth/school/change-password`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginUserMutation, useRegisterUserMutation, useChangePasswordMutation } =
  accountApiSlice;
