import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum character limit should be 6 to 20")
    .max(20, "Minimum character limit should be 6 to 20")
});

export type loginPayload = yup.InferType<typeof loginSchema>;

export const forgotEmailSchema = yup.object(). shape({
    email: yup.string().email().required("Email is required")
})

export type forgotEmailPayload = yup.InferType<typeof forgotEmailSchema>;

export const otpSchema = yup.object(). shape({
  otp: yup.string().required("OTP is required")
})

export type otpPayload = yup.InferType<typeof otpSchema>;

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Minimum character limit should be 6 to 20")
    .max(20, "Minimum character limit should be 6 to 20")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export type ResetPasswordPayload = yup.InferType<typeof resetPasswordSchema>;