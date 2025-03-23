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
  
  export const useEditArtistHook = () => {
    return useMutation({
      mutationKey: [Edit_ARTIST],
      mutationFn: async (payload: FormData) => {
        const res = await axiosInstance.post(endpoints.artist.edit, payload);
  
        return res?.data;
      },
      onError: (res) => {
        toast.error(res?.message ?? "");
      }
    });
  };
  
  export const useGetArtistInfoHook = (id: string) => {
    return useQuery({
      queryKey: [ARTIST_INFO],
      queryFn: async () => {
        const res = await axiosInstance.get<any>(
          `${endpoints.artist.getArtistInfo}/${id}`
        )
  
        return res?.data;
      }
    })
  }
  
  export const useGetArtistHook = () => {
    return useInfiniteQuery({
      queryKey: [GET_ARTIST],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosInstance.get<any>(
          `${endpoints.artist.get}?page=${pageParam}&limit=8`
        );
  
        return res?.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= lastPage?.page_count ? nextPage : undefined;
      }
    });
  };
  
  type DeleteParams = {
    imageKey: string;
  }
  
  export const useDeleteArtistHook = (id: string, body: DeleteParams) => {
    return useMutation({
      mutationKey: [DELETE_ARTIST],
      mutationFn: async () => {
        const res = await axiosInstance.delete(
          `${endpoints.artist.delete}/${id}`, {data: body}
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
      mutationKey: [CHANGE_STATUS],
      mutationFn: async () => {
        const res = await axiosInstance.put(`${endpoints.artist.change_status}/${id}`);
  
        return res?.data;
      },
      onError: (res) => {
        toast.error(res?.message ?? "");
      }
    });
  };
  
  // const {
  //   data,
  //   isLoading: isColorLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage
  // } = useInfiniteQuery(["color-list"], {
  //   queryFn: ({ pageParam = 1 }) =>
  //     GetColorCodeList({
  //       page: pageParam,
  //       per_page: 9,
  //       category_id: selectedCategory?.category_id as string,
  //       sub_cat_id: selectedCategory?.sub_cat_id as string,
  //       product_id: `${selectedCategory?.product_id}`
  //     }),
  //   getNextPageParam: (lastPage, allPages) => {
  //     const nextPage = allPages.length + 1;
  //     return nextPage <= lastPage?.page_count ? nextPage : undefined;
  //   },
  //   enabled: !!selectedCategory?.product_id,
  //   keepPreviousData: true
  // });
  