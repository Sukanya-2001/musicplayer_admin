import { useAuthLoginHook } from "@/api/functions/user.api";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { loginPayload, loginSchema } from "Schema/auth.schema";

const LoginForm: React.FC = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<loginPayload>({
    resolver: yupResolver(loginSchema)
  });

  const { isPending: loginPending } = useAuthLoginHook();

  const onSubmit = (data: loginPayload) => {
    reset();
    console.log(data);

    router.push("/dashboard");

    // loginMutate(data, {
    //   onSuccess: (res) => {
    //     if (res?.status === 200) {
    //       reset({
    //         email: "",
    //         password: ""
    //       });
    //       const token = res?.data?.token;
    //       if (token) {
    //         dispatch(setLoginData(res?.data?.user));
    //         setCookieClient(process.env.NEXT_APP_TOKEN_NAME!, token)
    //         router.push("/dashboard")
    //       }
    //     }
    //   }
    // });
  };

  const handleForgotPass = () => {
    router.push("/forgot-password");
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
          Welcome to Admin! 👋
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
            <InputFieldCommon
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="standard"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />

            <Box
              display="flex"
              justifyContent="right"
              alignItems="right"
              mt={1}
            >
              {/* <FormControlLabel control={<Checkbox color="primary" />} label="Remember Me" /> */}
              <Box onClick={handleForgotPass}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </Typography>
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loginPending}
              sx={{ mt: 3, mb: 2 }}
            >
              {loginPending ? (
                <CircularProgress size={28} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
