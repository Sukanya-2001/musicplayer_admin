/* eslint-disable react/no-array-index-key */
import { Album, useGetAlbumHook } from "@/api/functions/album.api";
import { AlbumTableRow } from "@/components/Dashboard/AlbumTableRow";
import { CustomTable } from "@/components/Dashboard/CustomTable";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const HomeWrapper = styled(Box)``;
const headers = ["Name", "Description", "Date", "Status", "Action"];

const Albums = () => {
  const router = useRouter();
  const {
    data: albumData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useGetAlbumHook();

  const albumList: Album[] = useMemo(() => {
    if (albumData) {
      return albumData?.pages?.flatMap((s) => s?.albums || []);
    }

    return [];
  }, [JSON.stringify(albumData)]);

  return (
    <DashboardWrapper headerTitle="Album">
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
            onClick={() => router.push("/dashboard/album-add")}
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
        ) : !!albumList && albumList?.length > 0 ? (
          <CustomTable tableHeadList={headers}>
            {albumList?.map((row) => (
              <AlbumTableRow key={row?._id} row={row} refetch={refetch} />
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
            Album not found.
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

export default Albums;
