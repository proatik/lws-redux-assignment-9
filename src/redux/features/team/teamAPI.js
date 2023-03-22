import apiSlice from "../api/apiSlice";

const teamAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => "/team",
    }),
  }),
});

export const { useGetTeamQuery } = teamAPI;
export default teamAPI;
