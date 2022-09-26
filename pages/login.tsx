import { Typography } from "@mui/material";
import { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => {
  return <Typography variant="title1">Login page</Typography>;
};

Login.getLayout = (page) => page;

export default Login;
