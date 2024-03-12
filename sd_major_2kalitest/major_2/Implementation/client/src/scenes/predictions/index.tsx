import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression from "regression";

const Predictions = () => {
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted = monthData.map(({ month, revenue }, i) => {
      return { name: month, "Actual Revenue": revenue, index: i };
    });
    const regressionLine = regression.linear(
      formatted.map((data) => [data.index, data["Actual Revenue"]])
    );

    return formatted.map((data) => {
      const predictedRevenue = regressionLine.predict(data.index + 12)[1];
      return { ...data, "Regression Line": regressionLine.predict(data.index)[1], "Predicted Revenue": predictedRevenue };
    });
  }, [kpiData]);

  return (
    <DashboardBox width="100%" height="100%" p="2rem" overflow="hidden" boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">
      <FlexBetween gap="2rem">
        <Box flex="1" mr="2rem">
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            Charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Box flex="1" display="flex" alignItems="center" justifyContent="flex-end">
          <Button
            onClick={() => setIsPredictions(!isPredictions)}
            variant="contained"
          >
            {isPredictions ? "Hide Predictions" : "Show Predicted Revenue for Next Year"}
          </Button>
        </Box>
      </FlexBetween>
      <Box mt="4rem">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={formattedData}
            margin={{ top: 20, right: 75, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ strokeWidth: 5, fill: "#8884d8" }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            {isPredictions && (
              <Line
                strokeDasharray="5 5"
                dataKey="Predicted Revenue"
                stroke="#ffc658"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </DashboardBox>
  );
};

export default Predictions;