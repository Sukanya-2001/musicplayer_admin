import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import CustomSwitch from "./CustomSwitch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const rows = [
  {
    name: "Sei tumi",
    email: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    phone: "Local train",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    email: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    phone: "Local train",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    email: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    phone: "Local train",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    email: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    phone: "Local train",
    date: "12 Feb, 2025"
  },
  {
    name: "Sei tumi",
    email: "Arijit Singh, Shreya Ghosal, Atif Aslam",
    phone: "Local train",
    date: "12 Feb, 2025"
  }
];

export default function UserTable() {
  const [switchStates, setSwitchStates] = React.useState<{
    [key: number]: boolean;
  }>({});

  const handleSwitchChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSwitchStates((prevState) => ({
        ...prevState,
        [index]: event.target.checked
      }));
    };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Publish Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px"
                }}
              >
                <CustomSwitch
                  checked={switchStates[index] || true}
                  onChange={handleSwitchChange(index)}
                />
              </StyledTableCell>

              <StyledTableCell align="center">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
