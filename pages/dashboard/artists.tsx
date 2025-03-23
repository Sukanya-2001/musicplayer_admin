/* eslint-disable react/no-array-index-key */
import { useGetArtistHook } from "@/api/functions/artist.api";
import { ArtistTableRow } from "@/components/Dashboard/ArtistTableRow";
import { CustomTable } from "@/components/Dashboard/CustomTable";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export const HomeWrapper = styled(Box)``;
const headers = ["Name", "Description", "Date", "Status", "Action"];

const data = [
  {
    _id: 1234,
    name: "John Doe",
    description: "Description",
    date: "20 Oct, 2020",
    status: true
  },
  {
    _id: 1234,
    name: "Jane Smith",
    description: "Description",
    date: "20 Oct, 2020",
    status: false
  },
  {
    _id: 1234,
    name: "Alice Johnson",
    description: "Description",
    date: "20 Oct, 2020",
    status: true
  },
  {
    _id: 1234,
    name: "Bob Brown",
    description: "Description",
    date: "20 Oct, 2020",
    status: false
  }
];
const Artists = () => {
  const router = useRouter();
  const {
    // data: artistData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetArtistHook();

  // const artistList: any = useMemo(() => {
  //   if (artistData) {
  //     return artistData?.pages?.flatMap((s) => s?.data || []);
  //   }
  //   return [];
  // }, [JSON.stringify(artistData)]);

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
        ) : (
          <CustomTable tableHeadList={headers}>
            {data?.map((row) => <ArtistTableRow key={row.name} row={row} />)}
          </CustomTable>
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
