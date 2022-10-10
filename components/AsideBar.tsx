import {
  List,
  ListProps,
  Typography,
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import LogoWhite from "../public/img/logo-white.png";
import { Link as MLink, LinkProps } from "@mui/material";
import { ExpandMoreIcon } from "../icons";
import theme from "../styles/theme";
import getAsideBarMenu from "../services/getAsideBarMenu";

const RusselAsideBar = styled(Box)<BoxProps>(({ theme }) => ({
  position: "fixed",
  zIndex: 1,
  padding: "40px 0",
  minWidth: "240px",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(20),
  overflow: "auto",
}));

const RusselAsideBarSubmenu = styled(List)<ListProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: 0,
  width: 203,
}));

const RusselAsideBarMenuItemCSS = (theme: Theme) => ({
  width: "100%",
  display: "flex",
  gap: theme.spacing(2),
  borderRadius: theme.spacing(1),
  color: theme.palette.neutral?.main,
  padding: theme.spacing(2),
  textDecoration: "none",
  cursor: "pointer",
  alignItems: "center",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.neutral?.main,
    color: theme.palette.neutral?.[9],
  },
});

const RusselAsideBarLink = styled(MLink)<LinkProps>(({ theme }) => ({
  ...RusselAsideBarMenuItemCSS(theme),
}));

const RusselAsideBarAccordionLink = styled(MLink)<LinkProps>(({ theme }) => ({
  color: theme.palette.neutral?.[5],
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.neutral?.main,
  },
}));

const RusselAsideBarAccordion = styled(Accordion)<AccordionProps>(
  ({ theme }) => ({
    ...RusselAsideBarMenuItemCSS(theme),
    display: "block",
    padding: 0,
    boxShadow: "none",
    "& .MuiAccordionSummary-root": {
      borderRadius: theme.spacing(1),
      ".expand-icon": {
        color: theme.palette.neutral?.main,
      },
    },
    "&:hover": {
      backgroundColor: "none",
    },
    "& .MuiAccordionSummary-root:hover": {
      backgroundColor: theme.palette.neutral?.main,
      color: theme.palette.neutral?.[9],
      ".expand-icon": {
        color: theme.palette.neutral?.[9],
      },
    },

    "& .MuiAccordionSummary-content": {
      margin: 0,
    },
  })
);

export const AsideBarLink = ({
  icon,
  text,
  href,
}: {
  icon: ReactNode;
  text: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <RusselAsideBarLink>
        {icon}
        <Typography variant="paragraph2" sx={{ fontWeight: "medium" }}>
          {text.toUpperCase()}
        </Typography>
      </RusselAsideBarLink>
    </Link>
  );
};

export const AsideBarAccordionLink = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <Link href={href}>
      <RusselAsideBarAccordionLink>
        <Typography variant="paragraph">{text}</Typography>
      </RusselAsideBarAccordionLink>
    </Link>
  );
};

export const AsideBarAccordion = ({
  text,
  icon,
  children,
}: {
  text: string;
  icon: ReactNode;
  children: ReactNode;
}) => {
  return (
    <RusselAsideBarAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="expand-icon" />}
        sx={{
          "& div": {
            display: "flex",
            gap: theme.spacing(2),
            alignItems: "center",
          },
        }}
      >
        {icon}
        <Typography variant="paragraph2" sx={{ fontWeight: "medium" }}>
          {text.toUpperCase()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingLeft: theme.spacing(6),
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(4),
        }}
      >
        {children}
      </AccordionDetails>
    </RusselAsideBarAccordion>
  );
};

const AsideBar = () => {
  const { pathname } = useRouter();
  const getAsideBarColor = () => {
    switch (pathname.split("/")[1]) {
      case "ecommerce":
        return "russel.dark";
      default:
        return "neutral.9";
    }
  };
  return (
    <RusselAsideBar sx={{ backgroundColor: getAsideBarColor() }}>
      <Link href={"/"}>
        <div style={{ minHeight: "56px" }}>
          <Image src={LogoWhite} width={141} style={{ cursor: "pointer" }} />
        </div>
      </Link>

      <RusselAsideBarSubmenu>{getAsideBarMenu()}</RusselAsideBarSubmenu>
    </RusselAsideBar>
  );
};

export default AsideBar;
