import { IFormInput } from "@/interface/common.interface";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

import {
  ADMIN_FROGOT_EMAIL,
  ADMIN_LOGIN,
  ADMIN_OTP,
  ADMIN_RESET_PASSWORD
} from "@/hooks/queryKeys";
import { IgetSignUpQuery } from "@/interface/apiresp.interfaces";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const signUpMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.signup,
    body
  );

  return res;
};
export const loginMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.login,
    body
  );

  return res;
};

export const useAuthLoginHook = () => {
  return useMutation({
    mutationKey: [ADMIN_LOGIN],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(endpoints.auth.login, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthForgotEmailHook = () => {
  return useMutation({
    mutationKey: [ADMIN_FROGOT_EMAIL],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(
        endpoints.auth.forgotEmail,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthOtpValidateHook = () => {
  return useMutation({
    mutationKey: [ADMIN_OTP],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(
        endpoints.auth.otpValidation,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthResetHook = () => {
  return useMutation({
    mutationKey: [ADMIN_RESET_PASSWORD],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(
        endpoints.auth.resetPassword,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const GetProfileDetails = async () => {
  const res = await axiosInstance.get<IgetSignUpQuery>(
    endpoints.auth.profileDetails
  );

  return res;
};
export const signUpProfileMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.signUpProfile,
    body
  );

  return res;
};
