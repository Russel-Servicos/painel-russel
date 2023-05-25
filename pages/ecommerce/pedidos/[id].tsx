import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Button, { LightButton } from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import OrderDetailsTable from "../../../components/OrderDatailsTable";
import StatusChip, { DBStatusName } from "../../../components/StatusChip";
import getPaymentMethod from "../../../services/getPaymentMethod";
import getPaymentMethodIcon from "../../../services/getPaymentMethodIcon";
import theme from "../../../styles/theme";

type Order = {
  code: string;
  id: number;
  status: string;
  createdAt: string;
  corporateName: string;
  total: string;
  paymentForm: number;
  items: {
    qtd: number;
    name: string;
    price: number;
    description: string;
  }[];
  user: {
    name: string;
    email: string;
    phone: string;
    ramal: string;
  };
  address: {
    street: string;
    district: string;
    city: string;
    cep: string;
    obs: string;
  };
};

const PedidoPage = ({ order }: { order: Order | null }) => {
  if (!order) {
    return (
      <>
        <p>Não foi possivel carregar pedido</p>
      </>
    );
  }
  const creationDate = new Date(order?.createdAt);

  return (
    <MainContainer>
      <Box display={"flex"} flexDirection={"column"} gap={"40px"}>
        <div>
          <Link href={"/ecommerce/pedidos"}>
            <LightButton small>voltar</LightButton>
          </Link>
        </div>
        <Box
          component={"section"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"40px"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="title2" sx={{ fontWeight: "medium" }}>
                Pedido #{order.code}
              </Typography>
              <Typography variant="paragraph">ID: {order.id}</Typography>
              <Typography variant="paragraph">
                {creationDate.getDate()}/{creationDate.getMonth()}/
                {creationDate.getFullYear()} às {creationDate.getHours() + 3}:
                {creationDate.getMinutes()}h
              </Typography>
            </Box>
            <Box>
              <Typography
                variant={"paragraph"}
                sx={{ fontWeight: "medium", marginRight: "8px" }}
              >
                Status:
              </Typography>

              <StatusChip status={order.status as DBStatusName} />
            </Box>
            <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Empresa:{" "}
                </Typography>
                {order.corporateName}
              </Typography>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Representante:
                </Typography>{" "}
                {order.user.name}
              </Typography>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Email:
                </Typography>{" "}
                {order.user.email}
              </Typography>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Telefone:
                </Typography>{" "}
                {order.user.phone}
              </Typography>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Ramal:
                </Typography>{" "}
                {order.user.ramal}
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            padding={"16px 40px"}
            alignItems={"center"}
            gap={"16px"}
            sx={{
              border: `1px solid ${theme.palette.neutral?.[5]}`,
              borderRadius: theme.spacing(1),
              height: "fit-content",
            }}
          >
            <Typography variant="title3" sx={{ fontWeight: "medium" }}>
              R${order.total}
            </Typography>
            <Box display={"flex"} gap={"12px"}>
              {getPaymentMethodIcon(order.paymentForm as 1 | 2 | 5 | 6)}
              <Typography>{getPaymentMethod(order.paymentForm)}</Typography>
            </Box>
            <Typography
              sx={{
                color:
                  order.status === "signed" || order.status === "paid"
                    ? theme.palette.status?.success
                    : theme.palette.neutral?.[7],
              }}
            >
              <Typography
                color={theme.palette.neutral?.[9]}
                component={"span"}
                fontWeight={"medium"}
              >
                Situação do contrato:
              </Typography>{" "}
              {order.paymentForm !== 6
                ? "N/A"
                : order.status === "signed" || order.status === "paid"
                ? "Assinado"
                : "Não assinado"}
            </Typography>
            <Button disabled>Ver contrato</Button>
          </Box>
        </Box>
        <section>
          <Typography variant="title3" fontWeight={"medium"}>
            Endereço de implantação
          </Typography>
          <Box display={"flex"} minWidth={"355px"} gap={"120px"}>
            <Box display={"flex"} gap={"8px"} flexDirection={"column"}>
              <Typography minWidth={"355px"}>
                <Typography component={"span"} fontWeight={"medium"}>
                  Endereço:
                </Typography>{" "}
                {order.address.street}
              </Typography>

              <Typography minWidth={"355px"}>
                <Typography component={"span"} fontWeight={"medium"}>
                  Bairro:
                </Typography>{" "}
                {order.address.district}
              </Typography>

              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Cidade:
                </Typography>{" "}
                {order.address.city}
              </Typography>
            </Box>

            <Box display={"flex"} gap={"8px"} flexDirection={"column"}>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  CEP:
                </Typography>{" "}
                {order.address.cep}
              </Typography>
              <Typography
                sx={{ wordWrap: "break-word", wordBreak: "break-all" }}
              >
                <Typography component={"span"} fontWeight={"medium"}>
                  Observações:
                </Typography>{" "}
                {order.address.obs || "N/A"}
              </Typography>
            </Box>
          </Box>
        </section>
        <section>
          <Typography variant={"title3"} fontWeight={"medium"}>
            Itens do pedido
          </Typography>
          <OrderDetailsTable items={order.items} />
        </section>
      </Box>
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  try {
    const order = await prisma.so_requests.findFirst({
      where: {
        code: context.params?.id as string,
      },

      /*include: {
        enterprise: {
          include: {
            users: true,
          },
        },
        address: true,
      },*/
    });
    return {
      props: {
        order: {
          code: order?.code,
          id: order?.id,
          status: order?.status,
          createdAt: order?.created_at?.toISOString(),
          type: order?.type,
          corporateName: "QUALQUER",
          total: order?.total,
          paymentForm: order?.payment_form,
          items: order?.items,
          user: {
            name: "QUALQUER", //order?.enterprise.users.name,
            email: "QUALQUER", //order?.enterprise.users.email,
            phone: "QUALQUER", //order?.enterprise.phone,
            ramal: "QUALQUER", //order?.enterprise.ramal,
          },
          address: {
            street: "QUALQUER", //order?.address.street,
            district: "QUALQUER", //order?.address.district,
            city: "QUALQUER", //order?.address.city,
            cep: "QUALQUER", //order?.address.cep,
            obs: "QUALQUER", //order?.address.description,
          },
        },
      },
    };
  } catch (err) {
    return {
      props: {
        order: null,
      },
    };
  }
};

export default PedidoPage;
