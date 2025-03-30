import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import toast from "react-hot-toast";
import { ADD_SONG } from "@/hooks/queryKeys";

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