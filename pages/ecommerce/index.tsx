import { NextPage } from "next";
import MainCard, { MainCardIconBox } from "../../components/MainCard";
import MainContainer from "../../components/MainContainer";
import ModuleContainer from "../../components/ModuleContainer";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HelpIcon from "@mui/icons-material/Help";
import theme from "../../styles/theme";

const Ecommerce: NextPage = () => {
  return (
    <MainContainer>
      <ModuleContainer>
        <MainCard
          href="/ecommerce/pedidos"
          icon={
            <MainCardIconBox
              icon={<ReceiptIcon />}
              color={theme.palette.russel?.medium}
            />
          }
          title={"Pedidos"}
          description={"Exibir lista de pedidos"}
        />
        <MainCard
          href="/"
          icon={
            <MainCardIconBox
              icon={<LocalOfferIcon />}
              color={theme.palette.russel?.medium}
            />
          }
          title={"Produtos"}
          description={"Exibir lista de produtos"}
        />
        <MainCard
          href="/"
          icon={
            <MainCardIconBox
              icon={<FormatListBulletedIcon />}
              color={theme.palette.russel?.medium}
            />
          }
          title={"Categorias"}
          description={"Exibir lista de categorias"}
        />
        <MainCard
          href="/"
          icon={
            <MainCardIconBox
              icon={<HelpIcon />}
              color={theme.palette.russel?.medium}
            />
          }
          title={"FAQs"}
          description={"Exibir lista de FAQs"}
        />
      </ModuleContainer>
    </MainContainer>
  );
};

export default Ecommerce;
