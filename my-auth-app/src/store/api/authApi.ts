import { createApi } from '@reduxjs/toolkit/query/react';
import { api } from '../../lib/api';
import { setToken, clearToken } from '../../lib/token';

// Create a custom base query
const customBaseQuery = async (args: any, { signal }: any, extraOptions: any) => {
  try {
    const result = await api({
      ...args,
      signal,
      ...extraOptions,
    });
    return { data: result.data };
  } catch (error: any) {
    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.token);
        } catch (error) {
          clearToken();
        }
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.token);
        } catch (error) {
          clearToken();
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          clearToken();
        } catch (error) {
          clearToken();
        }
      },
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/user',
      providesTags: ['Auth'],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.token);
        } catch (error) {
          clearToken();
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
} = authApi;