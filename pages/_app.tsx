import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import Layout from "../layouts/layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>{getLayout(<Component {...pageProps} />)}</CssBaseline>
    </ThemeProvider>
  );
}

export default MyApp;
