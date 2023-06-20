import {
  ICreateParentRequest,
  IGetParentsRequestParams,
  IGetParentsResponse,
} from "@/types/parents";
import { necttaAdminApi } from "../api.slice";

export const parentsApiSlice = necttaAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    createParent: builder.mutation<unknown, ICreateParentRequest>({
      query: (data) => ({
        url: `parent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parents", "Profile"],
    }),
    getDrivers: builder.query<IGetParentsResponse, IGetParentsRequestParams>({
      query: ({ page, limit }) => ({
        url: `parent`,
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Parents"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateParentMutation, useGetDriversQuery } = parentsApiSlice;