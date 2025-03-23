import {
  Artist,
  usechangeStatusArtistHook,
  useDeleteArtistHook
} from "@/api/functions/artist.api";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
import { CustomModal } from "./CustomModal";
import CustomSwitch from "./CustomSwitch";
import { useRouter } from "next/router";

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
  row: Artist;
  refetch: () => void;
}

export const ArtistTableRow: React.FC<OrderProps> = ({ row, refetch }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [statusChangeModal, setStatusChangeModal] =
    React.useState<boolean>(false);

  const { mutateAsync: deleteMutate, isPending: deletePending } =
    useDeleteArtistHook(row?._id, { imageKey: row?.file });
  const { mutateAsync: statusMutate, isPending: statusChangePending } =
    usechangeStatusArtistHook(row?._id);

  const confirmDelete = async () => {
    const res = await deleteMutate();
    if (res) {
      refetch();
      setDeleteModal(false);
    }
  };

  const confirmStatusChange = async () => {
    const res = await statusMutate();
    if (res?.status === 200) {
      refetch();
      setStatusChangeModal(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setDeleteModal(false);
    setAnchorEl(null);
  };

  const handleStatusModalClose = () => {
    setStatusChangeModal(false);
  };

  const handleEdit = () =>{
    router.push(`/dashboard/artist-edit/${row?._id}`)
  }

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{row?.title}</StyledTableCell>
      <StyledTableCell align="center">{row?.description}</StyledTableCell>
      <StyledTableCell align="center">
        {dayjs(row?.createdAt).format("DD MMM, YYYY")}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CustomSwitch
            checked={row?.status === "active"}
            onChange={() => setStatusChangeModal(true)}
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
          <MenuItem onClick={handleEdit}>
            <Button variant="text">Edit</Button>
          </MenuItem>
          <MenuItem onClick={handleDeleteModal}>
            <Button variant="text">Delete</Button>
          </MenuItem>
        </Menu>
      </StyledTableCell>
      <CustomModal
        open={deleteModal}
        onClose={handleModalClose}
        icon={
          <HighlightOffIcon
            fontSize="large"
            sx={{ color: "red", fontSize: "5rem" }}
          />
        }
        text="Do you want to delete this artist?"
        onConfirm={confirmDelete}
        isLoading={deletePending}
      />
      <CustomModal
        open={statusChangeModal}
        onClose={handleStatusModalClose}
        icon={
          <HighlightOffIcon
            fontSize="large"
            sx={{ color: "red", fontSize: "5rem" }}
          />
        }
        text="Do you want to change the status?"
        onConfirm={confirmStatusChange}
        isLoading={statusChangePending}
      />
    </StyledTableRow>
  );
};
