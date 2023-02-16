import { createTheme} from "@mui/material";
import React from "react";

let theme = createTheme({
  spacing: 4,
  palette: {
    russel: {
      main: "#CD1F26",
      medium: "#AA011C",
      dark: "#83071B",
    },

    neutral: {
      main: "#FFFFFF",
      2: "#FAFAFA",
      3: "#F7F7F7",
      4: "#F2F2F2",
      5: "#E5E5E5",
      6: "#D4D3D3",
      7: "#808080",
      8: "#4C4C4C",
      9: "#191919",
    },

    status: {
      success: "#397F48",
      caution: "#F4BB2A",
      error: "#BF3030",
      link: " #48619F",
    },
  },

  typography: {
    fontFamily: "Inter",
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    fontSize: 16,

    title1: {
      fontSize: "1.812rem",
      lineHeight: "125%",
      fontWeight: 600,
    },

    title2: {
      fontSize: "1.625rem",
      lineHeight: "125%",
      fontWeight: 600,
    },

    title3: {
      fontSize: "1.438rem",
      lineHeight: "125%",
      fontWeight: 600,
    },

    title4: {
      fontSize: "1.250rem",
      lineHeight: "125%",
      fontWeight: 600,
    },

    paragraph: {
      fontSize: "1rem",
      lineHeight: "150%",
      fontWeight: 400,
    },

    paragraph2: {
      fontSize: "0.875rem",
      lineHeight: "150%",
      fontWeight: 400,
    },

    label: {
      fontSize: "0.688rem",
      lineHeight: "150%",
      fontWeight: 400,
    },
  },
});

theme.shadows[1] = "0px 2px 4px rgba(0, 0, 0, 0.075)";
theme.shadows[2] = "0px 8px 16px rgba(0, 0, 0, 0.15)";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    russel?: RusselOptions;
    neutral?: NeutralOptions;
    status?: StatusOptions;
  }

  interface PaletteOptions {
    russel?: RusselOptions;
    neutral?: NeutralOptions;
    status?: StatusOptions;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;

    paragraph: React.CSSProperties;
    paragraph2: React.CSSProperties;

    label: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    title3?: React.CSSProperties;
    title4?: React.CSSProperties;

    paragraph?: React.CSSProperties;
    paragraph2?: React.CSSProperties;

    label?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
    title3: true;
    title4: true;

    paragraph: true;
    paragraph2: true;

    label: true;
  }
}

interface RusselOptions {
  main: string;
  medium: string;
  dark: string;
}

interface NeutralOptions {
  main: string;
  2?: string;
  3?: string;
  4?: string;
  5?: string;
  6?: string;
  7?: string;
  8?: string;
  9?: string;
}

interface StatusOptions {
  success: string;
  caution: string;
  error: string;
  link: string;
}

export default theme;
