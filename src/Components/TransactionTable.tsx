import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Row from "./Row";

type TransactionTableProps = {
  data: {
    productId: number;
    title: string;
    price: number;
    category: string;
    sold: boolean;
    dateOfSale: string;
    image: string;
    description: string;
  }[];
};

const TransactionTable = ({ data }: TransactionTableProps) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{overflowX:"auto"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>sold</TableCell>
              <TableCell>Date of Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
