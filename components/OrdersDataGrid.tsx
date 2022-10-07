import { Box, styled, Typography } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import Link from "next/link";
import getPaymentMethod from "../services/getPaymentMethod";
import { LightButton } from "./Button";
import StatusChip from "./StatusChip";

const RusselDataGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  width: "100%",
  background: theme.palette.neutral?.[2],
  border: `1px solid ${theme.palette.neutral?.[4]}`,
  "& .Mui-checked": {
    color: theme.palette.neutral?.[9],
  },
  "& .MuiDataGrid-cell": {
    textAlign: "center",
    padding: "12px 8px",
    color: theme.palette.neutral?.[9],
    borderBottom: `1px solid ${theme.palette.neutral?.[4]}`,
    whiteSpace: "normal !important",
    ".clamp": {
      wordWrap: "break-word",
      display: "-webkit-box",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
      height: "auto",
      width: "100%",
      overflow: "hidden",
    },
  },
  "& .MuiDataGrid-columnSeparator": { visibility: "hidden" },
  "& .MuiDataGrid-columnHeaders": {
    color: theme.palette.neutral?.[7],
    background: theme.palette.neutral?.[3],
    borderBottom: `1px solid ${theme.palette.neutral?.[4]}`,
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${theme.palette.neutral?.[4]}`,
  },
}));

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "CÓDIGO",
    flex: 0.6,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => (
      <Typography variant="paragraph" className="clamp">
        {value}
      </Typography>
    ),
  },
  {
    field: "date",
    headerName: "DATA",
    flex: 0.6,
    align: "center",
    headerAlign: "center",
    renderCell: (props) => {
      const { value } = props;
      const date = new Date(value);
      return (
        value && (
          <div style={{ textAlign: "center" }}>
            <Typography variant="paragraph" className="clamp">
              {date?.getDate()}/{date?.getMonth() + 1}/{date?.getFullYear()}
              <br />
              às {date?.getHours() + 3}:{date?.getMinutes()}h
            </Typography>
          </div>
        )
      );
    },
  },
  {
    field: "client",
    headerName: "CLIENTE",
    flex: 0.8,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => {
      return (
        <Typography variant="paragraph" className="clamp">
          {value}
        </Typography>
      );
    },
  },
  {
    field: "payment",
    headerName: "PAGAMENTO",
    align: "center",
    headerAlign: "center",
    flex: 0.7,
    renderCell: ({ value }) => {
      return (
        <Typography variant="paragraph" className="clamp">
          {getPaymentMethod(value)}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: "SITUAÇÃO",
    flex: 1.3,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => <StatusChip status={value} />,
  },
  {
    field: "total",
    headerName: "VALOR TOTAL",
    align: "center",
    headerAlign: "center",
    flex: 0.9,
    renderCell: ({ value }) => (
      <Typography variant="paragraph">R${value}</Typography>
    ),
  },
  {
    field: "details",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    flex: 1,
    renderCell: ({ id }) => (
      <Link href={`pedidos/${id}`}>
        <a>
          <LightButton>VER DETALHES</LightButton>
        </a>
      </Link>
    ),
  },
];

interface OrdersDataGridProps {
  rows: Array<OrdersDataGridRowsProps>;
  selectionModel: GridSelectionModel;
  onSelectionModelChange: (selectionModel: GridSelectionModel) => void;
}

export interface OrdersDataGridRowsProps {
  id: string;
  date: string;
  client: string;
  payment: number;
  status: string;
  total: number;
}

const OrdersDataGrid = ({
  rows,
  selectionModel,
  onSelectionModelChange,
}: OrdersDataGridProps) => {
  return (
    <Box display={"flex"} width={"100%"}>
      <div style={{ flexGrow: 1 }}>
        <RusselDataGrid
          autoHeight
          columns={columns}
          rows={rows}
          checkboxSelection
          pageSize={10}
          rowHeight={96}
          rowsPerPageOptions={[10, 20, 30]}
          selectionModel={selectionModel}
          onSelectionModelChange={onSelectionModelChange}
        />
      </div>
    </Box>
  );
};

export default OrdersDataGrid;
