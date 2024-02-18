import { BarChart } from "@mui/x-charts/BarChart";

type CustomBarChartProps = {
  barChartData: {
    [key: string]: {
      count: number;
    };
  };
};

const CustomBarChart = ({ barChartData }: CustomBarChartProps) => {
  const chartSetting = {
    yAxis: [
      {
        label: "Item Count",
      },
    ],
  };
  return (
    <BarChart
      height={300}
      xAxis={[
        {
          scaleType: "band",
          data: [
            "0 - 100",
            "101 - 200",
            "201 - 300",
            "301 - 400",
            "401 - 500",
            "501 - 600",
            "601 - 700",
            "701 - 800",
            "801 - 900",
            "901-above",
          ],
          label: "Price Range",
        },
      ]}
      series={[{ data: Object.values(barChartData).map((item) => item.count) }]}
      {...chartSetting}
    />
  );
};

export default CustomBarChart;
