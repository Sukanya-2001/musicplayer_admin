/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

import SongTable from "@/components/Dashboard/SongTable";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { useRouter } from "next/router";

export const HomeWrapper = styled(Box)``;

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
        <SongTable />
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Songs;
