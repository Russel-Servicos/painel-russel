import theme from "../styles/theme";
import Grid from "@mui/material/Unstable_Grid2";
import { NextPage } from "next";
import MainContainer from "../components/MainContainer";
import MainCard, { MainCardIconBox } from "../components/MainCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    russel: true;
    neutral: true;
  }
}

const Home: NextPage = () => {
  return (
    <MainContainer>
      <Grid container>
        <Grid xs={5}>
          <MainCard
            href="/ecommerce"
            icon={
              <MainCardIconBox
                icon={<ShoppingBagIcon />}
                color={theme.palette.russel?.main}
              />
            }
            title={"E-commerce"}
            description={
              "Aplicativo oficial do Nopake para criação de comercio eletrônico."
            }
          />
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Home;
