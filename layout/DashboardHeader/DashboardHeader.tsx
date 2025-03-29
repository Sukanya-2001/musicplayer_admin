import usePopUpConfirmation from "@/hooks/utils/usePopUpConfirmation";
import { logout } from "@/reduxtoolkit/slices/userSlice";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import styled from "@emotion/styled";
import { Box, BoxProps, Menu, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const DashboardHeaderStyled = styled(Box)`
  position: fixed;
  right: 20px;
  top: 20px;
  width: calc(100% - 307px);
  padding: 0 0 30px;
  .header_title {
    h1 {
      font-weight: 600;
      font-size: 23px;
    }
  }
  .notification_icon {
    width: 47px;
    height: 42px;
    border-radius: 5px;
    min-width: auto;
    padding: 0;
    margin-right: 12px;
    .is_active {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 100%;
        position: absolute;
        right: 0;
        top: 1px;
        z-index: 1;
      }
    }
  }
  .avatar_block {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar_btn {
    padding: 5px 12px;
    border-radius: 5px;
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
      font-family: "Roboto";
      font-weight: 500;
      font-size: 15px;
      line-height: 1.5;
      text-transform: capitalize;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
    }
  }
`;

interface headerProps extends BoxProps {
  headerHeightCallBack: (data: number) => void;
  headerTitle: string;
}
const DashboardHeader: React.FC<headerProps & BoxProps> = ({
  headerHeightCallBack,
  headerTitle,
  ...props
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarBlockRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { confirmAction } = usePopUpConfirmation();

  const [headerHeight, setHeaderHeight] = useState<number | undefined>(0);
  const [avatarMenuWidth, setAvatarMenuWidth] = useState<number | undefined>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleLogout = async () => {
    const { isConfirmed } = await confirmAction({
      title: "Logout",
      text: "Are you sure you want to logout?",
      confirmButtonText: "Yes, Logout"
    });
    if (!isConfirmed) return;
    dispatch(logout());
    toast.success("Logout successfully.");
  };

  useEffect(() => {
    if (avatarBlockRef.current) {
      setAvatarMenuWidth(avatarBlockRef.current?.clientWidth);
      const adjustWidth = () => {
        setAvatarMenuWidth(avatarBlockRef.current?.clientWidth);
      };

      window.addEventListener("resize", adjustWidth);

      return () => {
        window.removeEventListener("resize", adjustWidth);
      };
    }
  }, [avatarBlockRef.current]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current?.clientHeight);
      const adjustHeight = () => {
        setHeaderHeight(headerRef.current?.clientHeight);
      };

      window.addEventListener("resize", adjustHeight);

      return () => {
        window.removeEventListener("resize", adjustHeight);
      };
    }
  }, [headerRef.current]);

  useEffect(() => {
    if (headerHeight) {
      headerHeightCallBack(headerHeight);
    }
  }, [headerHeight]);

  return (
    <DashboardHeaderStyled ref={headerRef} {...props}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box className="header_title">
          <Typography variant="h1">{headerTitle}</Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          className="header_options"
          ref={avatarBlockRef}
        >
          <Box className="avatar_block">
            <CustomButtonPrimary
              id="basic-button"
              variant="contained"
              onClick={handleLogout}
              className="avatar_btn"
              disableRipple
            >
              Logout
            </CustomButtonPrimary>
          </Box>
        </Stack>
      </Stack>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;

export const AvatarMenu = styled(Menu, {
  shouldForwardProp: (data) => data !== "avatarMenuWidth"
})<{ avatarMenuWidth: number | undefined }>`
  .MuiPaper-root {
    width: ${({ avatarMenuWidth }) => `${avatarMenuWidth}px`};

    box-shadow: 0px 3px 28px -6px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    ul {
      padding: 17px 17px;
      li {
        font-family: "Roboto";
        font-weight: 400;
        font-size: 15px;
        line-height: 1.5;
        text-transform: capitalize !important;

        padding: 9px 0;
        &:first-child {
          padding-top: 0px;
        }
        &:last-child {
          padding-bottom: 0px;
        }
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
`;
