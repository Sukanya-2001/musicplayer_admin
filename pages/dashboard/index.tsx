/* eslint-disable react/no-array-index-key */
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import styled from "@emotion/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import React from "react";

export const HomeWrapper = styled(Box)``;
interface cardProps extends BoxProps {
  value: number;
  description: string;
  icon: React.ReactNode;
}

const Index = () => {
  return (
    <DashboardWrapper headerTitle="Dashboard">
      <HomeWrapper>
        <Grid container spacing={3}></Grid>
      </HomeWrapper>
    </DashboardWrapper>
  );
};

export default Index;
