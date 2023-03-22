import apiSlice from "../api/apiSlice";

// RTK actions.
import { setInitialSelected } from "../filters/filtersSlice";

const projectAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: projects } = await queryFulfilled;

          const selected = projects.map(({ projectName }) => projectName);
          dispatch(setInitialSelected(selected));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetProjectsQuery } = projectAPI;
export default projectAPI;
