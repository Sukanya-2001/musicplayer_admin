/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

import { CustomTable } from "@/components/Dashboard/CustomTable";
import { SongTableRow } from "@/components/Dashboard/SongTableRow";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useRouter } from "next/router";

export const HomeWrapper = styled(Box)``;
const headers = [
  "Name",
  "Artist",
  "Album",
  "Language",
  "Time",
  "Date",
  "Status",
  "Action"
];

const data = [
  {
    name: "John Doe",
    artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    album: "123-456-7890",
    language: "Hindi",
    time: "03:15",
    date: "20 Oct, 2020",
    status: true
  },
  {
    name: "Jane Smith",
    artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    album: "987-654-3210",
    language: "Hindi",
    time: "03:15",
    date: "20 Oct, 2020",
    status: false
  },
  {
    name: "Alice Johnson",
    artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    album: "456-789-1234",
    language: "Hindi",
    time: "03:15",
    date: "20 Oct, 2020",
    status: true
  },
  {
    name: "Bob Brown",
    artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    album: "789-123-4567",
    language: "Hindi",
    time: "03:15",
    date: "20 Oct, 2020",
    status: false
  }
];

const Songs = () => {
  const router = useRouter();

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
        <CustomTable tableHeadList={headers}>
          {data?.map((row) => <SongTableRow key={row.name} row={row} />)}
        </CustomTable>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Songs;
