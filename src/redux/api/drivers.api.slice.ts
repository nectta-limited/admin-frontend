import {
  ICreateDriverRequest,
  IGetDriversRequestParams,
  IGetDriversResponse,
  IUpdateDriverRequest,
} from "@/types/drivers";
import { necttaAdminApi } from "../api.slice";

export const driversApiSlice = necttaAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    createDriver: builder.mutation<unknown, ICreateDriverRequest>({
      query: (data) => ({
        url: `driver`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Drivers", "Profile"],
    }),
    updateDriver: builder.mutation<unknown, IUpdateDriverRequest>({
      query: (data) => ({
        url: `driver/${data.id}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["Drivers", "Profile"],
    }),
    getDrivers: builder.query<IGetDriversResponse, IGetDriversRequestParams>({
      query: ({ page = 1, limit }) => ({
        url: `driver?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Drivers"],
    }),
    deleteDriver: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `driver/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Drivers", "Profile"],
    }),
    deactivateDriver: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `driver/${id}/deactivate`,
        method: "PUT",
      }),
      invalidatesTags: ["Drivers", "Profile"],
    }),
    activateDriver: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `driver/${id}/activate`,
        method: "PUT",
      }),
      invalidatesTags: ["Drivers", "Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateDriverMutation,
  useGetDriversQuery,
  useDeleteDriverMutation,
  useActivateDriverMutation,
  useDeactivateDriverMutation,
  useUpdateDriverMutation,
} = driversApiSlice;
