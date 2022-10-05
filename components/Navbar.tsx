import {
  AppBar,
  AppBarProps,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemProps,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React from "react";
import { Box, BoxProps } from "@mui/system";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import theme from "../styles/theme";

const RusselNavbar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.neutral?.main,
  boxShadow: theme.shadows[1],
  color: "#191919",
  padding: `${theme.spacing(4)} ${theme.spacing(10)}`,
}));

const RusselNavbarTitleBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const RusselNavbarIconsList = styled(List)<BoxProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(4),
}));

const RusselNavbarIconNavItem = styled(ListItem)<ListItemProps>(
  ({ theme }) => ({
    padding: theme.spacing(0),
    width: "auto",
  })
);

interface Props {
  username: string;
}

const Navbar = ({ username }: Props) => {
  const { pathname } = useRouter();

  const getNavbarTitle = () => {
    const path = pathname.split("/")[1];
    switch (path) {
      case "":
        return "Russel Serviços";
      case "ecommerce":
        return "Ecommerce";
    }
  };

  const getNavbarSubtitle = () => {
    const subpath = pathname.split("/")[2];
    switch (subpath) {
      case undefined:
        return "Dashboard";
      case "pedidos":
        return "Pedidos";
    }
  };

  const getIconsGroup = () => {
    const iconsGroup = [
      <AppsIcon key={0} />,
      <Box
        key={1}
        display={"flex"}
        component={"div"}
        sx={{
          "& .notification": { display: "none" },
          "&:hover .notification-none": { display: "none" },
          "&:hover .notification": { display: "inline" },
        }}
      >
        <NotificationsNoneIcon className="notification-none" />
        <NotificationsIcon className="notification" />
      </Box>,
      <SettingsIcon key={2} />,
      <Box
        key={3}
        display={"flex"}
        component={"div"}
        alignItems={"center"}
        sx={{ gap: "8px", color: theme.palette?.status?.link }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "status.link",
          }}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 16 }} />
        </Avatar>
        <Typography variant="paragraph" sx={{ fontWeight: "medium" }}>
          {username.toUpperCase()}
        </Typography>
      </Box>,
    ];
    return iconsGroup.map((element, index) => (
      <RusselNavbarIconNavItem key={index}>
        <ListItemButton sx={{ padding: "8px", borderRadius: "8px" }}>
          {element}
        </ListItemButton>
      </RusselNavbarIconNavItem>
    ));
  };
  return (
    <RusselNavbar position="sticky">
      <Grid container columns={12}>
        <Grid xs={8}>
          <RusselNavbarTitleBox>
            <Typography variant="title1" sx={{ fontWeight: "bold" }}>
              {getNavbarTitle()}
            </Typography>
            <Typography variant="title3" sx={{ fontWeight: "light" }}>
              {getNavbarSubtitle()}
            </Typography>
          </RusselNavbarTitleBox>
        </Grid>
        <Grid xs={4}>
          <nav>
            <RusselNavbarIconsList>{getIconsGroup()}</RusselNavbarIconsList>
          </nav>
        </Grid>
      </Grid>
    </RusselNavbar>
  );
};

export default Navbar;
