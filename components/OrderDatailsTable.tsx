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
  items: {
    qtd: number;
    name: string;
    price: number;
    description: string;
  }[];
}

const OrderDetailsTable = ({ items }: Props) => {

  const description_treatment = (item_description: string) => {
    const details_list = item_description.split(";");
    const details_separate = details_list.map(item => item.split(':'))

    const render_bold = details_separate.map(item => {
      if (item.length < 2) {
        return (
          <p key={item[0]} style={{ textAlign: "left" }}>
           {item[0]}
          </p>
        );
      }
      return (
        <>
          <p style={{ textAlign: "left" }}>
            <b>{item[0]}</b>: {item[1]}
          </p>
        </>
      );
    });

    /*const unify = details_separate.forEach((item, index) => {

      if (details_separate[index + 1]?.length < 2) {
        console.log('nextunify', item)
        const newitem = item[1] + ',' + details_separate[index + 1][0];
        console.log('new', newitem)
      }
      if (item.length < 2) {
        console.log('needsunify', item)
      }
    });
    console.log('ajustada', unify)*/
    return render_bold;
  };

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
            <TableCell align="left">Quantidade</TableCell>
            <TableCell>Profissional/PRODUTO</TableCell>
            <TableCell align="left">Duração/INICIO</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(items as any[]).map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell align="center" >{item.qtd}</TableCell>
              <TableCell>{convertUnicode(item.name)}</TableCell>
              <TableCell align="left"  width={"100%"}>
                {description_treatment(item.description)}
              </TableCell>
              <TableCell align="right" >
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
