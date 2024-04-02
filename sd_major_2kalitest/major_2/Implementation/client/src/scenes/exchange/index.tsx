import React, { useState, useEffect } from 'react';
import { Typography, Box, Link } from '@mui/material';
import DashboardBox from "@/components/DashboardBox";
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CurrencyExchangeDashboard = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState([]);

  // Fetch exchange rates data
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const rates = response.data.rates;
        const exchangeRatesData = [
          { currency: baseCurrency, rate: 1, timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) }, // Include IST timestamp
          { currency: targetCurrency, rate: rates[targetCurrency], timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) } // Include IST timestamp
        ];
        setExchangeRates(exchangeRatesData);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency, targetCurrency]);

  // Handle base currency change
  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  // Handle target currency change
  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  return (
    <div>
      <Box textAlign="center" >
        <Typography variant="h1" gutterBottom style={{ color: '#45bb94', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', paddingTop: '10px'}}>
          EXCHANGE RATE DASHBOARD
        </Typography>
      </Box>

      {/* Currency Converter */}
      <Box textAlign="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <div style={{ marginRight: '5rem' }}>
            <label htmlFor="baseCurrency" style={{ fontSize: '1.5rem', color: 'white' }}>Select base currency  :  </label>
            <select id="baseCurrency" value={baseCurrency} onChange={handleBaseCurrencyChange} style={{ fontSize: '1rem' }}>
              {[ "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"]
.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: '5rem' }}>
            <label htmlFor="targetCurrency" style={{ fontSize: '1.5rem', color: 'white' }}>Select target currency  :  </label>
            <select id="targetCurrency" value={targetCurrency} onChange={handleTargetCurrencyChange} style={{ fontSize: '1rem' }}>
              {[ "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"]
.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </Box>
      </Box>

      {/* Link to Currency Codes */}
      <div style={{ textAlign: 'right', marginRight: '2rem'}}>
        <Box className="link-container">
          <Typography variant="body1" style={{ color: 'white', fontSize: '1rem'}}>
            <Link href="https://www.iban.com/currency-codes" target="_blank" rel="noopener noreferrer">
              Currency Codes
            </Link>
          </Typography>
        </Box>
      </div>

      {/* Exchange Rate Dashboard */}
      <Box textAlign="center" p={2}>
        {exchangeRates.length > 0 && (
          <DashboardBox width="100%" height="100%" p="2rem" overflow="hidden" boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" >
            <Typography variant="h4" p={1} color="white">{`${targetCurrency} to ${baseCurrency} Rate`}</Typography>
            <ResponsiveContainer width="100%" height={390}>
              <LineChart data={exchangeRates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="currency" />
                <YAxis />
                <Tooltip 
                  content={({ label, payload }) => {
                    if (payload && payload.length > 0) {
                      return (
                        <div style={{ backgroundColor: 'white', padding: '5px' }}>
                          <p><strong>{label}</strong></p>
                          {payload.map((item, index) => (
                            <p key={index}>
                              <span style={{ color: item.color }}>{item.name}:</span> {item.value}
                            </p>
                          ))}
                          <p><strong>Timestamp:</strong> {payload[0].payload.timestamp}</p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </DashboardBox>
        )}
      </Box>
    </div>
  );
};

export default CurrencyExchangeDashboard;
