import { ADD_SONG, GET_SONGS } from "@/hooks/queryKeys";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { Album } from "./album.api";
import { Artist } from "./artist.api";

export const useAddSongHook = () => {
  return useMutation({
    mutationKey: [ADD_SONG],
    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post(endpoints.song.add, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useGetSongsHook = () => {
  return useInfiniteQuery({
    queryKey: [GET_SONGS],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetSongsRes>(
        `${endpoints.song.allSongs}?page=${pageParam}&limit=8`
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

export type Status = "active" | "inactive";
export type SongType = "happy" | "sad" | "romantic" | "party" | string;
export type Language = "hindi" | "english" | "punjabi" | "bengali" | string;

export interface ISongs {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: number;
  imageFile: string;
  audioFile: string;
  selectArtist: Artist[];
  selectAlbum: Album; // If albums are more complex, create Album interface
  songType: SongType[];
  language: Language;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface GetSongsRes {
  songs: ISongs[];
  totalPage: number;
  totalArtist: number;
  page: number;
  limit: number;
  status: number;
}
