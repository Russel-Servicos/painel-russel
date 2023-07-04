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

type Address = {
  street: string;
  district: string;
  city: string;
  cep: string;
  description: string;
};
type Order = {
  code: string;
  id: number;
  status: string;
  createdAt: string;
  total: string;
  paymentForm: number;
  items:
    | {
        qtd: number;
        name: string;
        price: number;
        description: string;
      }[]
    | string;
  user: {
    name: string;
    corporate_name?: string;
    email: string;
    phone: string;
    document: string;
  };
  payment_address: Address;
  address: Address;
};

const PedidoPage = ({ order }: { order: Order | null }) => {
  if (!order) {
    return (
      <>
        <p>Não foi possivel carregar pedido</p>
      </>
    );
  }
  function treat(str: any) {
    // TODO: escape %x75 4HEXDIG ?? chars
    return str
      .replace(/\n/g,' ');
  }
  const creationDate = new Date(order?.createdAt);
  const order_items = order.items;

  const treated = treat(order_items);
  
  const json_items = JSON.parse(treated as string);

 
  /*const descriptions = json_items?.map((element: any) => element.description);
  console.log('descs', descriptions)

  const description_treatment = (item_description: string) => {
    const details_list = item_description.split(',')
    
    const bold_key = details_list.map((detail: string) => {
      const detail_array = detail.split(':');
      return detail_array[0] + ': ' + detail_array[1]
    })

    console.log('bold', bold_key)
    
  }

  description_treatment(descriptions[0]);*/

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
              {order?.user?.corporate_name && (
                <Typography>
                  <Typography component={"span"} fontWeight={"medium"}>
                    Empresa:{" "}
                  </Typography>
                  {order?.user?.corporate_name}
                </Typography>
              )}
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Contratante:
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
                  Documento:
                </Typography>{" "}
                {order.user.document}
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
                {order?.address?.street}
              </Typography>

              <Typography minWidth={"355px"}>
                <Typography component={"span"} fontWeight={"medium"}>
                  Bairro:
                </Typography>{" "}
                {order?.address?.district}
              </Typography>

              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Cidade:
                </Typography>{" "}
                {order?.address?.city}
              </Typography>
            </Box>

            <Box display={"flex"} gap={"8px"} flexDirection={"column"}>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  CEP:
                </Typography>{" "}
                {order?.address?.cep}
              </Typography>
              <Typography
                sx={{ wordWrap: "break-word", wordBreak: "break-all" }}
              >
                <Typography component={"span"} fontWeight={"medium"}>
                  Observações:
                </Typography>{" "}
                {order?.address?.description || "N/A"}
              </Typography>
            </Box>
          </Box>
        </section>
        <section>
          <Typography variant="title3" fontWeight={"medium"}>
            Endereço de Cobrança
          </Typography>
          <Box display={"flex"} minWidth={"355px"} gap={"120px"}>
            <Box display={"flex"} gap={"8px"} flexDirection={"column"}>
              <Typography minWidth={"355px"}>
                <Typography component={"span"} fontWeight={"medium"}>
                  Endereço:
                </Typography>{" "}
                {order.payment_address?.street}
              </Typography>

              <Typography minWidth={"355px"}>
                <Typography component={"span"} fontWeight={"medium"}>
                  Bairro:
                </Typography>{" "}
                {order.payment_address?.district}
              </Typography>

              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  Cidade:
                </Typography>{" "}
                {order.payment_address?.city}
              </Typography>
            </Box>

            <Box display={"flex"} gap={"8px"} flexDirection={"column"}>
              <Typography>
                <Typography component={"span"} fontWeight={"medium"}>
                  CEP:
                </Typography>{" "}
                {order.payment_address?.cep}
              </Typography>
              <Typography
                sx={{ wordWrap: "break-word", wordBreak: "break-all" }}
              >
                <Typography component={"span"} fontWeight={"medium"}>
                  Observações:
                </Typography>{" "}
                {order.payment_address?.description || "N/A"}
              </Typography>
            </Box>
          </Box>
        </section>
        <section>
          <Typography variant={"title3"} fontWeight={"medium"}>
            Itens do pedido
          </Typography>
          <OrderDetailsTable items={json_items} />
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
      include: {
        address: {
          select: {
            street: true,
            district: true,
            city: true,
            cep: true,
            description: true,
          },
        },
        payment_address: {
          select: {
            street: true,
            district: true,
            city: true,
            cep: true,
            description: true,
          },
        },
        user: true,
        enterprise: true,
      },
    });
    const user_document = order?.user?.cpf || order?.enterprise?.cnpj || 'Documento excluido';
    const user_phone =
      order?.user?.phone || order?.enterprise?.phone || "Telefone excluido";
    return {
      props: {
        order: {
          code: order?.code,
          id: order?.id,
          status: order?.status,
          createdAt: order?.created_at?.toISOString(),
          type: order?.type,
          total: order?.total,
          paymentForm: order?.payment_form,
          items: order?.items as string,
          user: {
            name: order?.user?.name || "Usuario excluido",
            corporate_name: order?.enterprise?.corporate_name || null,
            email: order?.user?.email || "Email excluido",
            phone: user_phone,
            document: user_document,
          },
          payment_address: order?.payment_address,
          address: order?.address,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        order: null,
      },
    };
  }
};

export default PedidoPage;
