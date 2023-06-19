import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { NECTTA_ADMIN_USER } from "../constants";
import { decrypto } from "@/helpers/encryption";
import { IUser } from "@/types/user";

export const necttaAdminApi = createApi({
  reducerPath: "necttaAdminApi",
  tagTypes: ["Profile", "Buses", "Drivers", "Parents", "Students"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const isBrowser = typeof window !== undefined;
      const encryptedUserData =
        (getState() as RootState).auth.user ?? isBrowser
          ? sessionStorage.getItem(NECTTA_ADMIN_USER) ?? localStorage.getItem(NECTTA_ADMIN_USER)
          : null;

      if (encryptedUserData && !headers.get("authorization")) {
        const decryptedUserData = decrypto<IUser>(encryptedUserData);
        const token = decryptedUserData?.token;
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  // refetchOnFocus: true,
  refetchOnReconnect: true,
});
