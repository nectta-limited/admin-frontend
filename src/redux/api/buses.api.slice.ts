import { necttaAdminApi } from "../api.slice";
import {
  ICreateBusRequest,
  IGetBusesRequestParams,
  IGetBusesResponse,
  IUpdateBusRequest,
} from "@/types/buses";

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
    updateBus: builder.mutation<unknown, IUpdateBusRequest>({
      query: (data) => ({
        url: `bus/${data.id}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["Buses", "Profile"],
    }),
    getBuses: builder.query<IGetBusesResponse, IGetBusesRequestParams>({
      query: ({ page = 1, limit }) => ({
        url: limit ? `bus?page=${page}&limit=${limit}` : `bus?page=${page}`,
      }),
      providesTags: ["Buses"],
    }),
    deleteBus: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `bus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Buses", "Profile"],
    }),
    deactivateBus: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `bus/${id}/deactivate`,
        method: "PUT",
      }),
      invalidatesTags: ["Buses", "Profile"],
    }),
    activateBus: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `bus/${id}/activate`,
        method: "PUT",
      }),
      invalidatesTags: ["Buses", "Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateBusMutation,
  useGetBusesQuery,
  useDeleteBusMutation,
  useDeactivateBusMutation,
  useActivateBusMutation,
  useUpdateBusMutation,
} = busesApiSlice;
