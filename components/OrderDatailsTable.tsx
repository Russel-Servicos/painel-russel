import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import convertUnicode from "../services/convertUnicode";
import getDuration from "../services/getDuration";
import theme from "../styles/theme";

interface Props {
  items: Array<{
    qtd: number;
    name: string;
    price: number;
    description: string;
  }>;
}

const OrderDetailsTable = ({ items }: Props) => {
  return (
    <TableContainer sx={{ borderRadius: theme.spacing(2), marginTop: "16px" }}>
      <Table
        sx={{
          border: `1px solid ${theme.palette.neutral?.[4]}`,
          overflow: "hidden",
          backgroundColor: theme.palette.neutral?.[2],
          minWidth: "100%",
          "th, td": {
            padding: "36px 34.5px",
            borderBottom: `1px solid ${theme.palette.neutral?.[4]}`,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Quantidade</TableCell>
            <TableCell>Profissional</TableCell>
            <TableCell align="center">Duração</TableCell>
            <TableCell align="center">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center" width={"176px"}>
                {item.qtd}
              </TableCell>
              <TableCell>{convertUnicode(item.name)}</TableCell>
              <TableCell align="center" width={"176px"}>
                {getDuration(item.description)}
              </TableCell>
              <TableCell align="center" width={"160px"}>
                R${item.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetailsTable;
