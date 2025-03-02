/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import UserTable from "@/components/Dashboard/UserTable";
import { useRouter } from "next/router";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

export const HomeWrapper = styled(Box)``;

const Artists = () => {
    const router = useRouter();

  return (
    <DashboardWrapper headerTitle="Users">
      <HomeWrapper>
      <Box sx={{margin:"30px", textAlign:"right",alignItems:"flex-end", justifyContent:"flex-end", display:"flex"}}>
        <CustomButtonPrimary variant="outlined" onClick={()=>router.push("/dashboard/artist-add")}> Add new</CustomButtonPrimary>
        </Box>
        <UserTable />
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Artists;
