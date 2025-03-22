import { useAuthResetHook } from "@/api/functions/user.api";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ResetPasswordPayload, resetPasswordSchema } from "Schema/auth.schema";

type Props = {
  email: string;
};

export const ResetPassword = ({ email }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ResetPasswordPayload>({
    resolver: yupResolver(resetPasswordSchema)
  });

  const { isPending: resetPending } =
    useAuthResetHook();

  const onSubmit = (data: ResetPasswordPayload) => {
    const payload = {
        email: email,
        password: data?.newPassword
    }
    console.log(payload);
    reset();
    router.push("/");

    // resetMutate(data)
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
          Reset Password
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
              label="New Password"
              variant="standard"
              autoComplete="email"
              {...register("newPassword")}
              error={!!errors?.newPassword}
              helperText={errors?.newPassword?.message}
            />

            <InputFieldCommon
              margin="normal"
              fullWidth
              label="Confirm Password"
              variant="standard"
              autoComplete="email"
              {...register("confirmPassword")}
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={resetPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {resetPending ? (
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
