import { Box, Typography } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
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

const Pedidos: NextPage = ({
  rows,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    payment: "",
  });

  const [search, setSearch] = useState("");
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

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
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              value={filters.date}
            />
            <FilterSelect
              options={[{ name: "teste", value: "teste" }]}
              label="Status"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              value={filters.status}
            />
            <FilterSelect
              options={[{ name: "teste", value: "teste" }]}
              label="Forma de pagamento"
              onChange={(e) =>
                setFilters({ ...filters, payment: e.target.value })
              }
              value={filters.payment}
            />
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button disabled endIcon={<DeleteIcon />}>
            Excluir
          </Button>
        </Box>

        <OrdersDataGrid
          rows={rows}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
        />
      </Box>
    </MainContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const requests = await prisma.so_requests.findMany({
    select: {
      code: true,
      enterprise: true,
      created_at: true,
      payment_form: true,
      status: true,
      total: true,
    },

    orderBy: {
      created_at: "desc",
    },
  });

  const rowsGroup = requests.map<OrdersDataGridRowsProps>((request) => ({
    id: request.code,
    date: request.created_at?.toISOString() || "",
    client: request.enterprise.corporate_name,
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
};

export default Pedidos;
