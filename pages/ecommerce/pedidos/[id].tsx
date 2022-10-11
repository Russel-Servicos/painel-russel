import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PrismaClient } from "@prisma/client";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Button, { LightButton } from "../../../components/Button";
import MainContainer from "../../../components/MainContainer";
import StatusChip from "../../../components/StatusChip";
import getPaymentMethod from "../../../services/getPaymentMethod";
import getPaymentMethodIcon from "../../../services/getPaymentMethodIcon";
import theme from "../../../styles/theme";

const Pedido: NextPage = ({
  order,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const creationDate = new Date(order.createdAt);
  return (
    <MainContainer>
      <Box display={"flex"} flexDirection={"column"} gap={"40px"}>
        <section>
          <LightButton small>voltar</LightButton>
        </section>
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

              <StatusChip status={order.status} />
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
              {getPaymentMethodIcon(order.paymentForm)}
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
      </Box>
    </MainContainer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient();
  const orders = await prisma.so_requests.findMany();
  const paths = orders.map((order) => {
    return { params: { id: order.code } };
  });

  await prisma.$disconnect();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const order = await prisma.so_requests.findFirst({
    where: {
      code: context.params?.id as string,
    },

    include: {
      enterprise: {
        include: {
          users: true,
        },
      },
    },
  });
  return {
    props: {
      order: {
        code: order?.code,
        id: order?.id,
        status: order?.status,
        createdAt: order?.created_at?.toISOString(),
        corporateName: order?.enterprise.corporate_name,
        total: order?.total,
        paymentForm: order?.payment_form,
        user: {
          name: order?.enterprise.users.name,
          email: order?.enterprise.users.email,
          phone: order?.enterprise.phone,
          ramal: order?.enterprise.ramal,
        },
      },
    },
  };
};

export default Pedido;
