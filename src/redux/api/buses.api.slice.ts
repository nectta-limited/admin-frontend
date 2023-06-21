import { necttaAdminApi } from "../api.slice";
import { ICreateBusRequest, IGetBusesRequestParams, IGetBusesResponse } from "@/types/buses";

export const busesApiSlice = necttaAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    createBus: builder.mutation<unknown, ICreateBusRequest>({
      query: (data) => ({
        url: `bus`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Buses", "Profile"],
    }),
    getBuses: builder.query<IGetBusesResponse, IGetBusesRequestParams>({
      query: ({ page = 1, limit = 2 }) => ({
        url: `bus?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Buses"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateBusMutation, useGetBusesQuery } = busesApiSlice;
