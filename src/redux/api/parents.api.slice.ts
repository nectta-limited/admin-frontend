import {
  ICreateParentRequest,
  IGetParentsRequestParams,
  IGetParentsResponse,
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
        method: "PUT",
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
    deleteParent: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `parent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parents", "Profile"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateParentMutation, useGetParentsQuery, useDeleteParentMutation } =
  parentsApiSlice;
