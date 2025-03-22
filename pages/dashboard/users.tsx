/* eslint-disable react/no-array-index-key */
import { CustomTable } from "@/components/Dashboard/CustomTable";
import { UserTableRow } from "@/components/Dashboard/UserTableRow";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const HomeWrapper = styled(Box)``;

const headers = ["Name", "Email", "Phone", "Date", "Status", "Action"];

const apiResponse = [
  {
    _id: "123456",
    fullName: "John Doe",
    mail: "john.doe@example.com",
    contact: "123-456-7890",
    createdAt: "2020-10-20",
    isActive: true
  },
  {
    _id: "789012",
    fullName: "Jane Smith",
    mail: "jane.smith@example.com",
    contact: "987-654-3210",
    createdAt: "2020-10-21",
    isActive: false
  },
  {
    _id: "345678",
    fullName: "Alice Johnson",
    mail: "alice.johnson@example.com",
    contact: "456-789-1234",
    createdAt: "2020-10-22",
    isActive: true
  },
  {
    _id: "901234",
    fullName: "Bob Brown",
    mail: "bob.brown@example.com",
    contact: "789-123-4567",
    createdAt: "2020-10-23",
    isActive: false
  }
];

const Users = () => {
  return (
    <DashboardWrapper headerTitle="Users">
      <HomeWrapper>
        <CustomTable tableHeadList={headers}>
          {apiResponse?.map((row) => <UserTableRow key={row._id} row={row} />)}
        </CustomTable>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Users;
