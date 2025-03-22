/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import CustomTable from "@/components/Dashboard/CustomTable";

export const HomeWrapper = styled(Box)``;

const headers = ["Name", "Email", "Phone","Date", "Status", "Action"];

const data = [
  { name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890", date:"20 Oct, 2020", status: true },
  { name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", date:"20 Oct, 2020", status: false },
  { name: "Alice Johnson", email: "alice.johnson@example.com", phone: "456-789-1234", date:"20 Oct, 2020", status: true},
  { name: "Bob Brown", email: "bob.brown@example.com", phone: "789-123-4567", date:"20 Oct, 2020", status: false },
];

const Users = () => {
  return (
    <DashboardWrapper headerTitle="Users">
      <HomeWrapper>
        <CustomTable headers={headers} data={data} />
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Users;
