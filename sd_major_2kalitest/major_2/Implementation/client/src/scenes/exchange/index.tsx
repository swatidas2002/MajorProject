import React, { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { Box } from "@mui/material";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// StyledDashboardBox component with zoom-in effect on hover
const StyledDashboardBox = styled(DashboardBox)`
  transition: transform 0.5s ease-in-out; // Adding transition for smooth animation
  &:hover {
    transform: scale(1.05); // Scaling up to 110% on hover
  }
`;

const ExchangeRateDashboard = () => {
  const theme = useTheme();
  const [exchangeRates, setExchangeRates] = useState({
    INR: [],
    GBP: [],
    AUD: [],
    EUR: []
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const responseINR = await fetch(
          "https://api.exchangerate-api.com/v4/latest/INR"
        );
        const dataINR = await responseINR.json();

        const responseGBP = await fetch(
          "https://api.exchangerate-api.com/v4/latest/GBP"
        );
        const dataGBP = await responseGBP.json();

        const responseAUD = await fetch(
          "https://api.exchangerate-api.com/v4/latest/AUD"
        );
        const dataAUD = await responseAUD.json();

        const responseEUR = await fetch(
          "https://api.exchangerate-api.com/v4/latest/EUR"
        );
        const dataEUR = await responseEUR.json();

        setExchangeRates({
          INR: [
            { currency: "INR", datetime: new Date(), USD: dataINR.rates.USD, INR: 1 }
          ],
          GBP: [
            { currency: "GBP", datetime: new Date(), USD: dataGBP.rates.USD, GBP: 1 }
          ],
          AUD: [
            { currency: "AUD", datetime: new Date(), USD: dataAUD.rates.USD, AUD: 1 }
          ],
          EUR: [
            { currency: "EUR", datetime: new Date(), USD: dataEUR.rates.USD, EUR: 1 }
          ]
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    const interval = setInterval(fetchExchangeRates, 60000); // Fetch every minute
    fetchExchangeRates(); // Initial fetch

    return () => clearInterval(interval); // Clean up interval
  }, []);

  return (
    <FlexBetween
      style={{ height: "100%", gap: "1rem", flexWrap: "wrap", overflow: "hidden", padding: "1rem" }} // Add padding here
    >
      {Object.keys(exchangeRates).map(currency => (
        <StyledDashboardBox
          key={currency}
          style={{
            width: "calc(50% - 1rem)",
            height: "calc(50% - 1rem)",
            padding: "1rem",
            overflow: "hidden"
          }}
        >
          <Box textAlign="center">
            <Typography variant="h3">{`${currency} to USD Exchange Rate`}</Typography>
            <ResponsiveContainer width="90%" height={225}>
              <LineChart data={exchangeRates[currency]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datetime" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="USD"
                  name="USD"
                  stroke={theme.palette.primary.main}
                />
                <Line
                  type="monotone"
                  dataKey={currency}
                  name={currency}
                  stroke={theme.palette.secondary.main}
                />
              </LineChart>
            </ResponsiveContainer>
            <Box mt={2}>
              <Typography variant="subtitle2" style={{ color: "#ffff", fontSize: "120%" }}>Currency</Typography>
            </Box>
          </Box>
        </StyledDashboardBox>
      ))}
    </FlexBetween>
  );
};

export default ExchangeRateDashboard;
