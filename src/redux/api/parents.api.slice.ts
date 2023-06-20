import { ICreateParentRequest } from "@/types/parents";
import { necttaAdminApi } from "../api.slice";

export const parentsApiSlice = necttaAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    createParent: builder.mutation<unknown, ICreateParentRequest>({
      query: (data) => ({
        url: `parent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parents"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateParentMutation } = parentsApiSlice;
