import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

type CustomBarChartProps = {
  pieChartData: {
    name: string;
    value: number;
  }[];
};

const CustomPieChart = ({ pieChartData }: CustomBarChartProps) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>
        Pie Chart
      </Typography>
      <PieChart
        fullWidth
        sx={{ marginLeft: -12.5 }}
        series={[
          {
            data: pieChartData,
          },
        ]}
        height={200}
      />
    </Box>
  );
};

export default CustomPieChart;
