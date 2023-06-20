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
      invalidatesTags: ["Buses"],
    }),
    getBuses: builder.query<IGetBusesResponse, IGetBusesRequestParams>({
      query: ({ page, limit }) => ({
        url: `bus`,
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Buses"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateBusMutation, useGetBusesQuery } = busesApiSlice;
