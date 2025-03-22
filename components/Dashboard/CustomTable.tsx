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
import { Box } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface CustomTableProps {
  headers: string[];
  data: Record<string, any>[];
}

export default function CustomTable({ headers, data }: CustomTableProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

//   const [switchStates, setSwitchStates] = React.useState<{ [key: number]: boolean }>({});

//   const handleSwitchChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {

    // setSwitchStates((prevState) => ({
    //   ...prevState,
    //   [index]: event.target.checked,
    // }));
//   };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
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
            {headers.map((header, index) => (
              <StyledTableCell key={index} align="center">
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {Object.keys(row).map((key, colIndex) => (
                <StyledTableCell key={colIndex} align="center">
                  {key === "status" ? (
                    <Box sx={{disply:"flex", justifyContent:"center"}}>
                    <CustomSwitch
                      checked={row?.status || false}
                      onChange={()=>{}}
                    />
                    </Box>
                  ) : (
                    row[key]
                  )}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">
                <IconButton onClick={(event) => handleClick(event, rowIndex)}>
                  <MoreVertIcon />
                </IconButton>
                {selectedRow === rowIndex && (
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
