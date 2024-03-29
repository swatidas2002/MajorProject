import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { Typography, useTheme } from "@mui/material";


Chart.register(ArcElement);

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [balanceData, setBalanceData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount || !type) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
      type,
      date: new Date().toLocaleString()
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount('');
    setType('');
  };

  const getTotalIncome = () => {
    return transactions
      .filter(transaction => transaction.type === 'Income')
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toFixed(2);
  };

  const getTotalExpense = () => {
    return transactions
      .filter(transaction => transaction.type === 'Expense')
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toFixed(2);
  };

  const getBalance = () => {
    return (getTotalIncome() - getTotalExpense()).toFixed(2);
  };

  const updateBalanceGraph = () => {
    const totalIncome = getTotalIncome();
    const totalExpense = getTotalExpense();

    const data = {
      datasets: [{
        data: [totalIncome, totalExpense],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)'
        ]
      }]
    };

    setBalanceData(data);
  };

  useEffect(() => {
    updateBalanceGraph();
  }, [transactions]);

  
  const containerStyle: React.CSSProperties = {
    color: '#45bb94',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Roboto Slab, sans-serif',
    fontSize: '35px',
    textAlign: 'center',
    marginBottom: '30px',
    marginTop: '40px', // Add margin top property for space above the title
  };
  

  return (
    <div className="expense-tracker" style={{ textAlign: 'center', color: '#fff' }}>
      <Typography variant="h1" style={containerStyle} gutterBottom>
        EXPENSE TRACKER
      </Typography>

     

      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Description" style={{ marginRight: '10px', width: '150px', padding: '5px' }} />
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" style={{ marginRight: '10px', width: '100px', padding: '5px' }} />
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100px', padding: '5px' }}>
            <option value="">Type</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>Add Transaction</button>
        </div>
      </form>

      <div>
        <h3>Transaction History</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {transactions.map(transaction => (
            <li key={transaction.id} style={{ marginBottom: '5px' }}>
              <strong>{transaction.text}</strong> - {transaction.type}: ${transaction.amount} ({transaction.date})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Balance</h3>
        <h4>Total Income: ${getTotalIncome()}</h4>
        <h4>Total Expenses: ${getTotalExpense()}</h4>
        <h4>Balance: ${getBalance()}</h4>
      </div>

      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <h3>Balance Graph</h3>
        {balanceData && <Doughnut data={balanceData} />}
      </div>
    </div>
  );
};

export default ExpenseTracker;
