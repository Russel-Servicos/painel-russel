import { Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import MainContainer from "../../components/MainContainer";

const Ecommerce: NextPage = () => {
  return (
    <MainContainer>
      <Typography variant="title1">Ecommerce</Typography>
      <Link href={"/ecommerce/pedidos"}>Pedidos</Link>
    </MainContainer>
  );
};

export default Ecommerce;
