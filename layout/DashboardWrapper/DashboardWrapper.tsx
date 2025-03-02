/* eslint-disable no-use-before-define */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import React, { useCallback, useState } from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar, IconButton, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Added Menu Icon
import assest from "@/json/assest";
import { useRouter } from "next/router";
import { sideFirstItems, sideSecondItems, sideThirdItems } from "@/lib/static/Demo";

const drawerWidth = 240;

interface DashBoardProps extends StackProps {
  headerTitle: string;
}

const DashboardWrapper: React.FC<DashBoardProps> = ({ headerTitle, ...props }) => {
  const [getHeaderHeight, setGetHeaderHeight] = useState<number>(0);
  const route = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerHeightCallBack = useCallback((data: number) => {
    setGetHeaderHeight(data);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div style={{ backgroundColor: "#FFFFFF", color: "#333333", height: "100%" }}>
      <Link href="/" className="headerLogo" style={{ justifyContent: "center", display: "flex", alignItems: "center", margin: "20px 0" }}>
        <Image src={assest.logo_img} width={80} height={28} alt="Logo" />
      </Link>

      {[sideFirstItems, sideSecondItems, sideThirdItems].map((menuItems, index) => (
        <React.Fragment key={index}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={() => route.push(item.route)}>
                  <ListItemIcon sx={{ color: "#333333" }}>{React.createElement(item.icon)}</ListItemIcon>
                  <ListItemText primary={item.name} sx={{ color: "#333333" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {index < 2 && <Divider sx={{ borderColor: "#E0E0E0" }} />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <DashboardWrapperStyled headerHeight={getHeaderHeight} direction="row" flexWrap="wrap" {...props}>
      {/* AppBar for Mobile Menu Button */}
      <AppBar position="fixed" sx={{ display: { sm: "none" }, backgroundColor: "#FFFFFF", boxShadow: "none", borderBottom: "1px solid #E0E0E0" }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ color: "#333333" }}>
            <MenuIcon />
          </IconButton>
          <h3 style={{ color: "#333333" }}>{headerTitle}</h3>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="sidebar">
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#FFFFFF",
              borderRight: "1px solid #E0E0E0", // Sidebar border
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent Drawer for Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#FFFFFF",
              borderRight: "1px solid #E0E0E0", // Sidebar border
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box className="wrapper_rgt">
        {/* Adjust header for mobile screens */}
        <Toolbar sx={{ display: { sm: "none" } }} />
        <DashboardHeader headerTitle={headerTitle} headerHeightCallBack={headerHeightCallBack} />
        <Box className="dashboard_body">{props.children}</Box>
      </Box>
    </DashboardWrapperStyled>
  );
};

export default DashboardWrapper;

export const DashboardWrapperStyled = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "headerHeight"
})<{ headerHeight: number }>`
  padding: 20px;
  height: 100vh;
  background-color: #F5F5F5; /* Light gray background */

  .wrapper_rgt {
    width: 100%;
    flex-basis: 100%;
    padding-left: 30px;
    padding-top: ${({ headerHeight }) => `${headerHeight}px`};
    margin-left: auto;
  }

  .dashboard_body {
    paddingTop: 30px;
    border-radius: 20px;
    height: calc(100vh - (40px + ${({ headerHeight }) => `${headerHeight}px`}));
    overflow-y: auto;
  }

  .common_box {
    padding: 16px 20px;
    border-radius: 10px;
  }

  @media (min-width: 600px) {
    .wrapper_rgt {
      width: calc(100% - ${drawerWidth}px);
      flex-basis: calc(100% - ${drawerWidth}px);
    }
  }
`;
