import {
  ADD_ARTIST,
  ARTIST_INFO,
  CHANGE_STATUS,
  DELETE_ARTIST,
  Edit_ARTIST,
  GET_ARTIST
} from "@/hooks/queryKeys";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const useAddArtistHook = () => {
  return useMutation({
    mutationKey: [ADD_ARTIST],
    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post(endpoints.artist.add, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useEditArtistHook = (id: string) => {
  return useMutation({
    mutationKey: [Edit_ARTIST],
    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.put(`${endpoints.artist.edit}/${id}`, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export interface Artist {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetArtistRes {
  artists: Artist[];
  totalPage: number;
  totalArtist: number;
  page: number;
  limit: number;
  status: number;
}

export const useGetArtistHook = () => {
  return useInfiniteQuery({
    queryKey: [GET_ARTIST],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetArtistRes>(
        `${endpoints.artist.get}?page=${pageParam}&limit=8`
      );

      return res?.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    },
  });
};

export interface GetInfoRes {
  artist: Artist
}

export const useGetArtistInfoHook = (id: string) => {
  return useQuery({
    queryKey: [ARTIST_INFO],
    queryFn: async () => {
      const res = await axiosInstance.get<GetInfoRes>(
        `${endpoints.artist.getArtistInfo}/${id}`
      );

      return res?.data?.artist;
    }
  });
};

type DeleteParams = {
  imageKey: string;
};

export const useDeleteArtistHook = (id: string, body: DeleteParams) => {
  return useMutation({
    mutationKey: [DELETE_ARTIST, id],
    mutationFn: async () => {
      const res = await axiosInstance.delete(
        `${endpoints.artist.delete}/${id}`,
        { data: body }
      );
      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const usechangeStatusArtistHook = (id: string) => {
  return useMutation({
    mutationKey: [CHANGE_STATUS, id],
    mutationFn: async () => {
      const res = await axiosInstance.put(
        `${endpoints.artist.change_status}/${id}`
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};
