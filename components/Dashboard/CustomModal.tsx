import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from "@mui/material";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: React.ReactNode;
  text: string;
  isLoading?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  icon,
  onConfirm,
  text,
  isLoading
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {icon}
          <Typography variant="h3" textAlign="center">
            {text}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "space-between", px: 3, pb: 2, mx: 3 }}
      >
        <CustomButtonPrimary
          variant="outlined"
          color="primary"
          onClick={onClose}
          sx={{ paddingX: "50px" }}
        >
          No
        </CustomButtonPrimary>
        <CustomButtonPrimary
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ paddingX: "50px" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={28} sx={{ color: "white" }} />
          ) : (
            "Yes"
          )}
        </CustomButtonPrimary>
      </DialogActions>
    </Dialog>
  );
};
