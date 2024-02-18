import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomBarChart from "./CustomBarChart";

type StatData = {
  stats: {
    totalPrice: number;
    sold: number;
    unsold: number;
  };
  barChartData: {
    [key: string]: {
      count: number;
    };
  };
  pieChartData: {
    name: string;
    value: number;
  }[];
};

type DetailModalProps = {
  open: boolean;
  handleClose: () => void;
  month: number;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 2,
  bgcolor: "white",
  boxShadow: 24,
  height: 600,
  width: 800,
  overflow: "auto",
  p: 4,
};

const DetailModal = ({ open, handleClose, month }: DetailModalProps) => {
  const [data, setData] = useState<StatData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://transaction-backend.onrender.com/api/v1/transactions/monthly-stats?month=3`
      );
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://transaction-backend.onrender.com/api/v1/transactions/monthly-stats?month=${month}`
      );
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, [month]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Monthly Sales Detail Modal"
      aria-describedby="Monthly Sales Detail Modal"
    >
      <Box bgcolor={"white"}>
        <Box sx={style}>
          <Typography variant="h4" align="center" fontWeight={700}>
            Statistics -{" "}
            {new Date(0, month, 0).toLocaleString("default", { month: "long" })}
          </Typography>
          <Divider sx={{ marginBottom: 4 }} />
          {data && (
            <>
              <Table sx={{ marginBottom: 4 }}>
                <TableRow>
                  <TableCell>Total Sale</TableCell>
                  <TableCell>{data.stats.totalPrice}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Sold Items</TableCell>
                  <TableCell>{data.stats.sold}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Not Sold Items</TableCell>
                  <TableCell>{data.stats.unsold}</TableCell>
                </TableRow>
              </Table>

              <Box>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Bar Chart
                    <CustomBarChart barChartData={data.barChartData} />
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Pie Chart
                  </Typography>
                  <PieChart
                    fullWidth
                    sx={{ marginLeft: -12.5 }}
                    series={[
                      {
                        data: data.pieChartData,
                      },
                    ]}
                    height={200}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
