import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosRequestConfig, AxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import {
  IAuthor,
  ILocations,
  IParams,
  IPicture,
} from "../../interface/interface";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const pictureApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://test-front.framework.team",
  }),
  endpoints: (build) => ({
    pictureApi: build.query<IPicture[], IParams>({
      query: ({
        page,
        search,
        limit,
        authorId,
        locationId,
        from,
        to,
      }: IParams) => ({
        url: "/paintings",
        method: "get",
        params: {
          _limit: limit,
          _page: page,
          q: search,
          authorId: authorId,
          locationId: locationId,
          created_gte: from,
          created_lte: to,
        },
      }),
    }),
    authorApi: build.query<IAuthor[], string>({
      query: (search?: string) => ({
        url: "/authors",
        method: "get",
        params: {
          q: search,
        },
      }),
    }),
    locationApi: build.query<ILocations[], string>({
      query: (search?: string) => ({
        url: "/locations",
        method: "get",
        params: {
          q: search,
        },
      }),
    }),
  }),
});

export const { usePictureApiQuery, useAuthorApiQuery, useLocationApiQuery } =
  pictureApi;
