import { useAuthForgotEmailHook } from "@/api/functions/user.api";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { forgotEmailPayload, forgotEmailSchema } from "Schema/auth.schema";

export const ForgotForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<forgotEmailPayload>({
    resolver: yupResolver(forgotEmailSchema)
  });

  const { isPending: forgotPending } =
    useAuthForgotEmailHook();

  const onSubmit = (data: forgotEmailPayload) => {
    console.log(data);
    reset();
    router.push(`/verification/${data?.email}`);

    // forgotMutate(data)
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
          Forgot Password
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
              label="Email"
              variant="standard"
              autoComplete="email"
              {...register("email")}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={forgotPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {forgotPending ? (
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
