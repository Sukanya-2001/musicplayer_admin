/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import UserTable from "@/components/Dashboard/UserTable";

export const HomeWrapper = styled(Box)``;

const users = () => {
  return (
    <DashboardWrapper headerTitle="Users">
      <HomeWrapper>
        <UserTable />
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default users;
