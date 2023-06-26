import {
  ICreateParentRequest,
  IGetParentsRequestParams,
  IGetParentsResponse,
  IGetSingleParentResponse,
  ISearchParentsRequestParams,
  IUpdateParentRequest,
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
    updateParent: builder.mutation<unknown, IUpdateParentRequest>({
      query: (data) => ({
        url: `parent/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Parents", "Profile"],
    }),
    getParents: builder.query<IGetParentsResponse, IGetParentsRequestParams>({
      query: ({ page = 1, limit }) => ({
        url: `parent?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Parents"],
    }),
    getSingleParent: builder.query<IGetSingleParentResponse, number>({
      query: (id) => ({
        url: `parent/${id}`,
      }),
      providesTags: ["Parents"],
    }),
    searchParents: builder.query<IGetParentsResponse, ISearchParentsRequestParams>({
      query: ({ page = 1, limit, query }) => ({
        url: `driver/search?page=${page}&limit=${limit}&query=${query}`,
      }),
      providesTags: ["Parents"],
    }),
    deleteParent: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `parent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parents", "Profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateParentMutation,
  useGetParentsQuery,
  useDeleteParentMutation,
  useUpdateParentMutation,
  useSearchParentsQuery,
  useGetSingleParentQuery,
} = parentsApiSlice;
