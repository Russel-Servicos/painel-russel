import theme from "../styles/theme";
import Grid from "@mui/material/Unstable_Grid2";
import { NextPage } from "next";
import MainContainer from "../components/MainContainer";
import MainCard, { MainCardIconBox } from "../components/MainCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InsertPhotoIcon from "@mui/icons-material/InsertPhotoOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import FolderIcon from "@mui/icons-material/Folder";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    russel: true;
    neutral: true;
  }
}

const Home: NextPage = () => {
  return (
    <MainContainer>
      <Grid
        container
        sx={{ rowGap: theme.spacing(12), columnGap: theme.spacing(6) }}
      >
        <Grid md={5}>
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
        <Grid md={5}>
          <MainCard
            href="/ecommerce"
            icon={
              <MainCardIconBox
                icon={<InsertPhotoIcon />}
                color={theme.palette.status?.caution}
              />
            }
            title={"Galeria"}
            description={
              "Galeria de imagens para o E-commerce da Russel Serviços."
            }
          />
        </Grid>
        <Grid md={5}>
          <MainCard
            href="/ecommerce"
            icon={
              <MainCardIconBox
                icon={<GradeIcon />}
                color={theme.palette.neutral?.[9]}
              />
            }
            title={"Anúncios"}
            description={"Anúncios e redirecionamentos"}
          />
        </Grid>
        <Grid>
          <MainCard
            href="/ecommerce"
            icon={
              <MainCardIconBox
                icon={<FolderIcon />}
                color={theme.palette.status?.link}
              />
            }
            title={"Gerenciador de Arquivos"}
            description={"Aplicativo para gerenciamento de arquivos."}
          />
        </Grid>
        <Grid md={5}>
          <MainCard
            href="/ecommerce"
            icon={
              <MainCardIconBox
                icon={<AttachMoneyIcon />}
                color={theme.palette.status?.success}
              />
            }
            title={"Checkout API"}
            description={
              "API de Checkout para permite realizar pagamentos via PIX, Cartão de crédito e..."
            }
          />
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default Home;
