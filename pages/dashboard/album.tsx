/* eslint-disable react/no-array-index-key */
import CustomTable from "@/components/Dashboard/CustomTable";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

export const HomeWrapper = styled(Box)``;
const headers = ["Name", "Description", "Date", "Status", "Action"];

const data = [
  { name: "John Doe", Description: "Description", date:"20 Oct, 2020", status: true },
  { name: "Jane Smith", Description: "Description", date:"20 Oct, 2020", status: false },
  { name: "Alice Johnson", Description: "Description", date:"20 Oct, 2020", status: true},
  { name: "Bob Brown", Description: "Description", date:"20 Oct, 2020", status: false },
];
const Album = () => {
    const router = useRouter();

  return (
    <DashboardWrapper headerTitle="Album">
      <HomeWrapper>
      <Box sx={{margin:"30px", textAlign:"right",alignItems:"flex-end", justifyContent:"flex-end", display:"flex"}}>
        <CustomButtonPrimary variant="outlined" onClick={()=>router.push("/dashboard/album-add")}> Add new</CustomButtonPrimary>
        </Box>
        <CustomTable headers={headers} data={data} />
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Album;
