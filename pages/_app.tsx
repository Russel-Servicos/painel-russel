import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Backdrop, CircularProgress, CssBaseline } from "@mui/material";
import Layout from "../layouts/layout";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Router, useRouter } from "next/router";
import { sendStatusCode } from "next/dist/server/api-utils";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  //noAuthNeeded?: boolean;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

function Loader() {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

    //para lidar com mudança de rota
    //adicionar um loader
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {isLoading && <Loader />}
          {getLayout(<Component {...pageProps} />)}
          {/*(Component as any).noAuthNeeded ? (
            <Component {...pageProps} />
          ) : (
            <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
          )*/}
        </CssBaseline>
      </ThemeProvider>
    </SessionProvider>
  );
}

/*function Auth({ children }: any) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  useEffect(() => {
    if (status === "loading") return;

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, status]);

  if (isAuthenticated) {
    return children;
  }
  return <Loader />;
}*/

export default MyApp;
