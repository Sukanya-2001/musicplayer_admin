/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

import CustomTable from "@/components/Dashboard/CustomTable";
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
    Artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    Album: "123-456-7890",
    Language: "Hindi",
    Time: "03:15",
    date: "20 Oct, 2020",
    status: true
  },
  {
    name: "Jane Smith",
    Artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    Album: "987-654-3210",
    Language: "Hindi",
    Time: "03:15",
    date: "20 Oct, 2020",
    status: false
  },
  {
    name: "Alice Johnson",
    Artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    Album: "456-789-1234",
    Language: "Hindi",
    Time: "03:15",
    date: "20 Oct, 2020",
    status: true
  },
  {
    name: "Bob Brown",
    Artist: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    Album: "789-123-4567",
    Language: "Hindi",
    Time: "03:15",
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
        <CustomTable headers={headers} data={data} />
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Songs;
