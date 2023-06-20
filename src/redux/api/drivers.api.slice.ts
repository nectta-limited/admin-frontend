import {
  ICreateDriverRequest,
  IGetDriversRequestParams,
  IGetDriversResponse,
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
      invalidatesTags: ["Drivers"],
    }),
    getDrivers: builder.query<IGetDriversResponse, IGetDriversRequestParams>({
      query: ({ page, limit }) => ({
        url: `driver`,
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Drivers"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateDriverMutation, useGetDriversQuery } = driversApiSlice;
