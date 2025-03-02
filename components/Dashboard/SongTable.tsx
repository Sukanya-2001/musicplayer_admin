import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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

function createData(
  name: string,
  artists: string,
  albums: string,
  language: string,
  time: string,
  date: string
) {
  return { name, artists, albums, language, time, date };
}

const rows = [
  createData(
    "Sei tumi",
    "Arijit Singh, Shreya Ghosal, Atif Aslam",
    "Local train",
    "Hindi",
    "03:14",
    "12 Feb, 2025"
  ),
  createData(
    "Sei tumi",
    "Arijit Singh, Shreya Ghosal, Atif Aslam",
    "Local train",
    "Hindi",
    "03:14",
    "12 Feb, 2025"
  ),
  createData(
    "Sei tumi",
    "Arijit Singh, Shreya Ghosal, Atif Aslam",
    "Local train",
    "Hindi",
    "03:14",
    "12 Feb, 2025"
  ),
  createData(
    "Sei tumi",
    "Arijit Singh, Shreya Ghosal, Atif Aslam",
    "Local train",
    "Hindi",
    "03:14",
    "12 Feb, 2025"
  ),
  createData(
    "Sei tumi",
    "Arijit Singh, Shreya Ghosal, Atif Aslam",
    "Local train",
    "Hindi",
    "03:14",
    "12 Feb, 2025"
  )
];

export default function SongTable() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
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
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Artists</StyledTableCell>
            <StyledTableCell align="center">Album</StyledTableCell>
            <StyledTableCell align="center">Language</StyledTableCell>
            <StyledTableCell align="center">Time</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Publish Date</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.artists}</StyledTableCell>
              <StyledTableCell align="center">{row.albums}</StyledTableCell>
              <StyledTableCell align="center">{row.language}</StyledTableCell>
              <StyledTableCell align="center">{row.time}</StyledTableCell>
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
              <StyledTableCell align="center">
                <IconButton onClick={(event) => handleClick(event, index)}>
                  <MoreVertIcon />
                </IconButton>
                {selectedRow === index && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button variant="text">View</Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button variant="text">Edit</Button>
                    </MenuItem>
                  </Menu>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
