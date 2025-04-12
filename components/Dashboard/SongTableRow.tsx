import { ISongs } from "@/api/functions/song.api";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
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

interface OrderProps {
  row: ISongs;
  
  // refetch: () => void;
}

export const SongTableRow: React.FC<OrderProps> = ({ row }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{row?.title}</StyledTableCell>
      <StyledTableCell align="center">
        {row?.selectArtist?.slice(0, 4)?.map((item) => item?.title ?? "Not Available")}
      </StyledTableCell>
      <StyledTableCell align="center">
        {row?.selectAlbum?.title ?? "Not Available"}
      </StyledTableCell>
      <StyledTableCell align="center">{row?.language}</StyledTableCell>
      {/* <StyledTableCell align="center">{row.time}</StyledTableCell> */}
      <StyledTableCell align="center">
        {dayjs(row?.createdAt).format("DD MMM, YYYY")}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomSwitch
            checked={row?.status === "active"}
            onChange={() => {}}
          />
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
