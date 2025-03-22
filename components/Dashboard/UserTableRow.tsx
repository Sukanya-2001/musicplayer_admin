import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import * as React from "react";
import CustomSwitch from "./CustomSwitch";
import { Box, Button } from "@mui/material";

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

interface OrderProps {
  row: any;
}

export const UserTableRow: React.FC<OrderProps> = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{row.fullName}</StyledTableCell>
      <StyledTableCell align="center">{row.mail}</StyledTableCell>
      <StyledTableCell align="center">{row.contact}</StyledTableCell>
      <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
      <StyledTableCell align="center">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomSwitch checked={row.isActive} onChange={() => {}} />
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem onClick={handleClose}>
            <Button variant="text">Edit</Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Button variant="text">Delete</Button>
          </MenuItem>
        </Menu>
      </StyledTableCell>
    </StyledTableRow>
  );
};
