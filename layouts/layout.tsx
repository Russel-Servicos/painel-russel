import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import AsideBar from "../components/AsideBar";
import Navbar from "../components/Navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <Box display="flex" height={"100%"}>
    <AsideBar />
    <Box width={"100%"}>
      <Navbar username="pepe" />
      {children}
    </Box>
  </Box>
);

export default Layout;
