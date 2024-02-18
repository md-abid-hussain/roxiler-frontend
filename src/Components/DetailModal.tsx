import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import Divider from '@mui/material/Divider';

type DetailModalProps = {
  open: boolean;
  handleClose: () => void;
  month: number;
};
const style = {
  //   transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p:6
};

const DetailModal = ({ open, handleClose, month }: DetailModalProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/transactions/monthly-stats?month=2`
      );
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:4000/api/v1/transactions/monthly-stats?month=${month}`
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
      <Box sx={{ minHeight: "100vh", display: "grid", placeContent: "center" }}>
        <Box sx={style}>
            <Typography variant="h4" align="center" fontWeight={700}>
                {new Date(month).toLocaleString("default", { month: "long" })} Sales
            </Typography>
            <Divider />
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Pie Chart
            </Typography>
            <PieChart
              series={[
                {
                  data: data.pieChartData,
                },
              ]}
              height={200}
              width={500}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailModal;
