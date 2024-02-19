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
      <Box sx={{display:'grid',placeContent:"center"}}>
        <PieChart
          slotProps={{
            legend: {
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle",
              },
            },
          }}
          margin={{ top: -24,right: 12, bottom: 12, left: 12 }}
          series={[
            {
              data: pieChartData,
            },
          ]}
          width={300}
          height={450}
        />
      </Box>
    </Box>
  );
};

export default CustomPieChart;
