import {
  ADD_ALBUM,
  ALBUM_INFO,
  CHANGE_STATUS_ALBUM,
  DELETE_ALBUM,
  Edit_ALBUM,
  GET_ALBUM
} from "@/hooks/queryKeys";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const useAddAlbumHook = () => {
  return useMutation({
    mutationKey: [ADD_ALBUM],
    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post(endpoints.album.add, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useEditAlbumHook = (id: string) => {
  return useMutation({
    mutationKey: [Edit_ALBUM, id],
    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.put(
        `${endpoints.album.edit}/${id}`,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export interface Album {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAlbumRes {
  albums: Album[];
  totalPage: number;
  totalAlbum: number;
  page: number;
  limit: number;
  status: number;
}

export const useGetAlbumHook = () => {
  return useInfiniteQuery({
    queryKey: [GET_ALBUM],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetAlbumRes>(
        `${endpoints.album.get}?page=${pageParam}&limit=8`
      );

      return res?.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    }
  });
};

export interface GetInfoRes {
  album: Album;
}

export const useGetAlbumInfoHook = (id: string) => {
  return useQuery({
    queryKey: [ALBUM_INFO, id],
    queryFn: async () => {
      const res = await axiosInstance.get<GetInfoRes>(
        `${endpoints.album.getAlbumInfo}/${id}`
      );

      return res?.data?.album;
    },
    refetchOnMount: true
  });
};

type DeleteParams = {
  imageKey: string;
};

export const useDeleteAlbumHook = (id: string, body: DeleteParams) => {
  return useMutation({
    mutationKey: [DELETE_ALBUM, id],
    mutationFn: async () => {
      const res = await axiosInstance.delete(
        `${endpoints.album.delete}/${id}`,
        { data: body }
      );
      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const usechangeStatusAlbumHook = (id: string) => {
  return useMutation({
    mutationKey: [CHANGE_STATUS_ALBUM, id],
    mutationFn: async () => {
      const res = await axiosInstance.put(
        `${endpoints.album.change_status}/${id}`
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};
