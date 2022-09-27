import { styled } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/system";
import { ReactNode } from "react";

const RusselMainContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: `0 ${theme.spacing(10)}`,
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
}));

interface Props {
  children: ReactNode;
}

const MainContainer = ({ children }: Props) => {
  return (
    <RusselMainContainer component={"main"}>{children}</RusselMainContainer>
  );
};

export default MainContainer;
