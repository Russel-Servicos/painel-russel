import { NextPage } from "next";
import { useRouter } from "next/router";
import MainContainer from "../../../components/MainContainer";

const Pedido: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  return (
    <MainContainer>
      <h1>Pedido #{id}</h1>
    </MainContainer>
  );
};

export default Pedido;
