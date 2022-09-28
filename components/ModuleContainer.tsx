import Grid from "@mui/material/Unstable_Grid2";
import React, { ReactNode } from "react";
import theme from "../styles/theme";

interface Props {
  children: ReactNode;
}

const ModuleContainer = ({ children }: Props) => {
  return (
    <Grid columns={12} container sx={{ rowGap: theme.spacing(10) }}>
      {children &&
        React.Children.map(children, (child) => (
          <>
            <Grid md={4}>{child}</Grid>
          </>
        ))}
    </Grid>
  );
};

export default ModuleContainer;
