import { useAuthOtpValidateHook } from "@/api/functions/user.api";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { otpPayload, otpSchema } from "Schema/auth.schema";

type Props = {
  email: string;
  handleResetPassword: () => void;
};

export const OtpVerify = ({ email, handleResetPassword }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<otpPayload>({
    resolver: yupResolver(otpSchema)
  });
  console.log(email);

  const { isPending: otpPending } =
    useAuthOtpValidateHook();

  const onSubmit = (data: otpPayload) => {
    const payload = {
      email: email,
      otp: data?.otp
    };
    console.log(payload);
    reset()
    handleResetPassword();

    // otpMutate(payload);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, textAlign: "center" }}
      >
        <Typography variant="h3" fontWeight="bold" fontSize={40}>
          Verify OTP
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: 3, fontSize: "20px" }}
        >
          Please sign-in to your account and start the adventure
        </Typography>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputFieldCommon
              margin="normal"
              fullWidth
              label="Enter Otp"
              variant="standard"
              {...register("otp")}
              error={!!errors?.otp}
              helperText={errors?.otp?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={otpPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {otpPending ? (
                <CircularProgress size={28} sx={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};
