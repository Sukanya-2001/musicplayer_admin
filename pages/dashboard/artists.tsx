/* eslint-disable react/no-array-index-key */
import { ArtistTableRow } from "@/components/Dashboard/ArtistTableRow";
import { CustomTable } from "@/components/Dashboard/CustomTable";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export const HomeWrapper = styled(Box)``;
const headers = ["Name", "Description", "Date", "Status", "Action"];

const data = [
  {
    name: "John Doe",
    description: "Description",
    date: "20 Oct, 2020",
    status: true
  },
  {
    name: "Jane Smith",
    description: "Description",
    date: "20 Oct, 2020",
    status: false
  },
  {
    name: "Alice Johnson",
    description: "Description",
    date: "20 Oct, 2020",
    status: true
  },
  {
    name: "Bob Brown",
    description: "Description",
    date: "20 Oct, 2020",
    status: false
  }
];
const Artists = () => {
  const router = useRouter();

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
        <CustomTable tableHeadList={headers}>
          {data?.map((row) => <ArtistTableRow key={row.name} row={row} />)}
        </CustomTable>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Artists;
