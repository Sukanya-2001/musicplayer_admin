/* eslint-disable react/no-array-index-key */
import { Artist, useGetArtistHook } from "@/api/functions/artist.api";
import { ArtistTableRow } from "@/components/Dashboard/ArtistTableRow";
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

const Artists = () => {
  const router = useRouter();
  const {
    data: artistData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useGetArtistHook();

  const artistList: Artist[] = useMemo(() => {
    if (artistData) {
      return artistData?.pages?.flatMap((s) => s?.artists || []);
    }

    return [];
  }, [JSON.stringify(artistData)]);

  return (
    <DashboardWrapper headerTitle="Artists">
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
            onClick={() => router.push("/dashboard/artist-add")}
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
        ) : !!artistList && artistList?.length > 0 ? (
          <CustomTable tableHeadList={headers}>
            {artistList?.map((row) => (
              <ArtistTableRow key={row?._id} row={row} refetch={refetch} />
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
            Artist not found.
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

export default Artists;
