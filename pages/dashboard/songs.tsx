/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

import { ISongs, useGetSongsHook } from "@/api/functions/song.api";
import { CustomTable } from "@/components/Dashboard/CustomTable";
import { SongTableRow } from "@/components/Dashboard/SongTableRow";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const HomeWrapper = styled(Box)``;
const headers = [
  "Name",
  "Artist",
  "Album",
  "Language",
  "Date",
  "Status",
  "Action"
];

const Songs = () => {
  const router = useRouter();
  const {
    data: songsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetSongsHook();

  const songsList: ISongs[] = useMemo(() => {
    if (songsData) {
      return songsData?.pages?.flatMap((s) => s?.songs || []);
    }

    return [];
  }, [JSON.stringify(songsData)]);

  return (
    <DashboardWrapper headerTitle="Songs">
      <HomeWrapper>
        <Box
          sx={{
            margin: "30px",
            textAlign: "right",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            display: "flex"
          }}
        >
          <CustomButtonPrimary
            variant="outlined"
            onClick={() => router.push("/dashboard/song-add")}
          >
            Add new
          </CustomButtonPrimary>
        </Box>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress />
          </Box>
        ) : !!songsList && songsList?.length > 0 ? (
          <CustomTable tableHeadList={headers}>
            {songsList?.map((row) => (
              <SongTableRow key={row?._id} row={row} />
            ))}
          </CustomTable>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            Songs not found.
          </Box>
        )}

        {!!hasNextPage && (
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {" "}
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              onClick={() => {
                fetchNextPage();
              }}
              type="button"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <CircularProgress size={28} sx={{ color: "white" }} />
              ) : (
                "Load more"
              )}
            </CustomButtonPrimary>
          </Box>
        )}
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Songs;
