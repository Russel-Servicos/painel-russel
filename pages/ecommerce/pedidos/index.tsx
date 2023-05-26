import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from "next";
import React from "react";
import { useState } from "react";
import Button from "../../../components/Button";
import FilterSelect from "../../../components/FilterSelect";
import MainContainer from "../../../components/MainContainer";
import OrdersDataGrid, {
  OrdersDataGridRowsProps,
} from "../../../components/OrdersDataGrid";
import SearchInput from "../../../components/SearchInput";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../../../styles/theme";
import { GridSelectionModel } from "@mui/x-data-grid";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const Pedidos: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ rows }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [rowsState, setRowsState] = useState([...rows]);
  const [search, setSearch] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isDelteButtonDisabled = () => {
    return selectionModel.length < 1;
  };

  const onDeleteButtonClick = async () => {
    try {
      setLoading(true);
      await axios.post("/api/ecommerce/pedidos?action=delete", {
        resources: selectionModel as [string],
      });
      setRowsState(rowsState.filter((row) => !selectionModel.includes(row.id)));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
   const onFiltersChange = (filters: {
     date?: string;
     status?: string;
     payment?: string;
   }) => {
     //buscar no banco items que correspondem aos filtros passados
   };

  return (
    <MainContainer>
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        justifyContent={"space-between"}
        gap={"24px"}
      >
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          flexDirection={"row"}
        >
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
            sx={{
              color: theme.palette.neutral?.[7],
              fontWeight: "medium",
              gap: theme.spacing(6),
            }}
          >
            <Typography
              variant="paragraph"
              component={"span"}
              sx={{ fontWeight: "medium" }}
            >
              Filtros:
            </Typography>

            <FilterSelect
              options={[{ name: "teste", value: "teste" }]}
              label="Data"
              onFiltersChange={onFiltersChange}
            />
            <FilterSelect
              options={[{ name: "teste", value: "teste" }]}
              label="Status"
              onFiltersChange={onFiltersChange}
            />
            <FilterSelect
              options={[{ name: "teste", value: "teste" }]}
              label="Forma de pagamento"
              onFiltersChange={onFiltersChange}
            />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            onClick={onDeleteButtonClick}
            disabled={isDelteButtonDisabled() || loading}
            endIcon={<DeleteIcon />}
          >
            Excluir
          </Button>
        </Box>

        {rows && <OrdersDataGrid
          rows={rowsState}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
        />}
      </Box>
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  try {
    const requests = await prisma.so_requests.findMany({
      select: {
        code: true,
        id: true,
        user: true,
        created_at: true,
        payment_form: true,
        status: true,
        total: true,
        enterprise: true,
        
      },
      orderBy: {
        created_at: "desc",
      },
    });
   console.log(requests);
    const rowsGroup = requests.map<OrdersDataGridRowsProps>((request) => ({
      id: request.id,
      code: request.code,
      date: request.created_at?.toISOString() || "",
      client: request?.enterprise?.corporate_name || request?.user?.name || 'USUARIO EXCLUIDO',
      payment: request.payment_form,
      total: request.total,
      status: request.status || "",
    }));


    await prisma.$disconnect();
    const rows: Array<OrdersDataGridRowsProps> | [] = rowsGroup;
    return {
      props: {
        rows,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        rows: [],
      },
    };
  }
};

export default Pedidos;
