import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Typography } from '@mui/material';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('INR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const handleBaseCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetCurrency(event.target.value);
  };

  const convertCurrency = () => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then(response => {
        const rates = response.data.rates;
        const targetRate = rates[targetCurrency];
        if (targetRate) {
          const converted = amount * targetRate;
          setConvertedAmount(converted);
        } else {
          alert('Invalid target currency');
        }
      })
      .catch(error => {
        console.error('Failed to fetch exchange rates:', error);
        alert('Failed to fetch exchange rates. Please try again.');
      });
  };

  return (
    <div className="currency-converter-container">
      <style>{`
        /* CSS Styles for Currency Converter */
        .currency-converter-container {
            width: 500px;
            margin: auto;
            padding: 50px;
            height: 100vh;
            text-align: center;
            overflow: none;
        }
        
        body {
            overflow: hidden;
        }

        .input-container {
            margin-bottom: 20px;
          
        }

        .input-container label {
            display: block;
            margin-bottom: 5px;
            
            color: white; /* Set the color to white */
        }

        .input-container select,
        .input-container input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .button-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
      `}</style>
      <div className="input-container">
        <Typography variant="h1" gutterBottom style={{ color: '#45bb94', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', paddingBottom: '20px' }}>
          CURRENCY CONVERTER
        </Typography>
        <label htmlFor="amount">Enter amount:</label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="input-container">
        <label htmlFor="baseCurrency">Select base currency:</label>
        <select id="baseCurrency" value={baseCurrency} onChange={handleBaseCurrencyChange}>
          {[ "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"].map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="targetCurrency">Select target currency:</label>
        <select id="targetCurrency" value={targetCurrency} onChange={handleTargetCurrencyChange}>
          {["USD","INR","EUR", "GBP", "JPY", "AUD", "CHF", "CNY", "CAD", "MXN", "NZD", "SGD", "HKD", "SEK", "KRW", "NOK", "TRY", "RUB", "ZAR"].map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>

      <div className="button-container">
        <Button onClick={convertCurrency} style={{ fontSize: '1.2rem', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>
            Convert
        </Button>
      </div>

      {/* Display converted amount if available */}
      {convertedAmount !== null && (
        <div className="conversion-result" style={{ color: '#4CBB17', fontSize: '18px', paddingTop: '25px' }}>
          {`${amount} ${baseCurrency} is approximately ${convertedAmount.toFixed(2)} ${targetCurrency}`}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
