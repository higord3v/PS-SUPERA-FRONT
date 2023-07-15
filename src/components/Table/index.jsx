import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";
import fromUnixTime from "date-fns/fromUnixTime";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ transferencias, saldos }) {
  let real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Saldo Total: {real.format(saldos.total)}</TableCell>
            <TableCell>
              Saldo No Período: {real.format(saldos.periodo)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <StyledTableCell>dados</StyledTableCell>
            <StyledTableCell>valencia</StyledTableCell>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Nome Operador Transacionado</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transferencias.map((t) => (
            <StyledTableRow key={t.id}>
              <StyledTableCell component="th" scope="row">
                {format(fromUnixTime(t.dataTransferencia), "dd/MM/yyyy")}
              </StyledTableCell>
              <StyledTableCell>{real.format(t.valor)}</StyledTableCell>
              <StyledTableCell>{t.tipo}</StyledTableCell>
              <StyledTableCell>{t.nomeOperadorTransacao}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
