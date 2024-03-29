import React, { useState } from 'react';
import './tax.css'; // Import CSS file for styling
import { useToast, Button, Input, InputLeftElement, InputGroup } from '@chakra-ui/react';

function TaxCalculator() {
  const [income, setIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [miscellaneousExpenses, setMiscellaneousExpenses] = useState<number>(0);
  const [estimatedTaxPayments, setEstimatedTaxPayments] = useState<number>(0);
  const [entityType, setEntityType] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('');
  const [tax, setTax] = useState<number>(0);

  const toast = useToast(); // Initialize useToast hook

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    console.log('Income value:', value); // Add this line for debugging
    if (value <= 0 || isNaN(value)) {
      toast({ description: 'Please enter an income value greater than 0', status: 'warning' });
    } else {
      setIncome(value);
    }
  };

  const handleTotalExpensesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalExpenses(parseFloat(event.target.value));
  };

  const handleMiscellaneousExpensesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMiscellaneousExpenses(parseFloat(event.target.value));
  };

  const handleEstimatedTaxPaymentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedTaxPayments(parseFloat(event.target.value));
  };

  const handleEntityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntityType(event.target.value);
  };

  const handleFilingStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilingStatus(event.target.value);
  };

  const calculateTax = () => {
    if (!entityType || !filingStatus) {
      // If not selected, show the toast
      addToast();
      return; // Exit the function
    }

    let taxAmount = 0;
    let taxableIncome = income - totalExpenses - miscellaneousExpenses - estimatedTaxPayments;

    taxableIncome = Math.max(0, taxableIncome);

    switch (entityType) {
      case 'C-Corporation':
        taxAmount = calculateCCorporationTax(taxableIncome);
        break;
      case 'S-Corporation':
        taxAmount = calculateSCorporationTax(taxableIncome, filingStatus);
        break;
      case 'LLC - Single member':
        taxAmount = calculateIndividualTax(taxableIncome, filingStatus);
        break;
      case 'LLC - C-Corporation':
        taxAmount = calculateCCorporationTax(taxableIncome);
        break;
      case 'LLC - S-Corporation':
        taxAmount = calculateSCorporationTax(taxableIncome, filingStatus);
        break;
      case 'LLC - Partnership':
        taxAmount = calculatePartnerTax(taxableIncome, filingStatus);
        break;
      default:
        taxAmount = 0;
    }

    setTax(taxAmount);
  };

  const calculateCCorporationTax = (income: number) => {
    // Assume a flat corporate tax rate of 21%
    return income * 0.21;
  };

  const calculateSCorporationTax = (income: number, filingStatus: string) => {
    // Assume individual tax rates based on filing status
    let taxRate = 0;
    switch (filingStatus) {
      case 'Single':
        taxRate = 0.22;
        break;
      case 'Married, Filing Jointly':
        taxRate = 0.20;
        break;
      case 'Married, Filing Separately':
        taxRate = 0.24;
        break;
      case 'Head of Household':
        taxRate = 0.18;
        break;
      case 'Qualifying Widow(er)':
        taxRate = 0.20;
        break;
      default:
        taxRate = 0.22;
    }
    return income * taxRate;
  };

  const calculateIndividualTax = (income: number, filingStatus: string) => {
    // Assume individual tax rates based on filing status
    let taxRate = 0;
    switch (filingStatus) {
      case 'Single':
        taxRate = 0.24;
        break;
      case 'Married, Filing Jointly':
        taxRate = 0.20;
        break;
      case 'Married, Filing Separately':
        taxRate = 0.22;
        break;
      case 'Head of Household':
        taxRate = 0.18;
        break;
      case 'Qualifying Widow(er)':
        taxRate = 0.20;
        break;
      default:
        taxRate = 0.24;
    }
    return income * taxRate;
  };

  const calculatePartnerTax = (income: number, filingStatus: string) => {
    // Assume individual tax rates based on filing status
    let taxRate = 0;
    switch (filingStatus) {
      case 'Single':
        taxRate = 0.23;
        break;
      case 'Married, Filing Jointly':
        taxRate = 0.19;
        break;
      case 'Married, Filing Separately':
        taxRate = 0.21;
        break;
      case 'Head of Household':
        taxRate = 0.17;
        break;
      case 'Qualifying Widow(er)':
        taxRate = 0.19;
        break;
      default:
        taxRate = 0.23;
    }
    return income * taxRate;
  };

  const addToast = () => {
    toast({ description: 'Please select entity type and filing status', status: 'error' });
  };

  return (
    <div className="tax-calculator-container">
      
      <div>
        <label htmlFor="entityType">Select entity type:</label>
        <select id="entityType" value={entityType} onChange={handleEntityTypeChange}>
          <option value="" style={{ fontWeight: 'bold' }}>Select your Entity Type</option>
          <option value="C-Corporation">C-Corporation</option>
          <option value="S-Corporation">S-Corporation</option>
          <option value="LLC - Single member">LLC - Single member</option>
          <option value="LLC - C-Corporation">LLC - C-Corporation</option>
          <option value="LLC - S-Corporation">LLC - S-Corporation</option>
          <option value="LLC - Partnership">LLC - Partnership</option>
        </select>
      </div>
      <div>
        <label htmlFor="filingStatus">Select filing status:</label>
        <select id="filingStatus" value={filingStatus} onChange={handleFilingStatusChange}>
<option value="" style={{ fontWeight: 'bold' }} >Select your Filing Status</option>
<option value="Single">Single</option>
<option value="Married, Filing Jointly">Married, Filing Jointly</option>
<option value="Married, Filing Separately">Married, Filing Separately</option>
<option value="Head of Household">Head of Household</option>
<option value="Qualifying Widow(er)">Qualifying Widow(er)</option>
</select>
</div>
<div>
  <label htmlFor="income">Enter your income ( in $):</label>
  
  <div className="input-with-dollar">
    
    <input
      type="number"
      id="income"
      value={income}
      onChange={handleIncomeChange}
    />
  </div>
</div>
<div>
  <label htmlFor="totalExpenses">Total expenses ( in $):</label>
  <div className="input-with-dollar">
    
    <input
      type="number"
      id="totalExpenses"
      value={totalExpenses}
      onChange={handleTotalExpensesChange}
    />
  </div>
</div>
<div>
  <label htmlFor="miscellaneousExpenses">Miscellaneous expenses ( in $):</label>
  <div className="input-with-dollar">
    
    <input
      type="number"
      id="miscellaneousExpenses"
      value={miscellaneousExpenses}
      onChange={handleMiscellaneousExpensesChange}
    />
  </div>
</div>
<div>
  <label htmlFor="estimatedTaxPayments">Estimated tax payments ( in $):</label>
  <div className="input-with-dollar">
    
    <input
      type="number"
      id="estimatedTaxPayments"
      value={estimatedTaxPayments}
      onChange={handleEstimatedTaxPaymentsChange}
    />
  </div>
</div>

<div style={{ marginTop: '20px' }}>
    <Button onClick={calculateTax}>Calculate Tax</Button>
  </div>

  <div>
  {tax > 0 && (
    <p>
      <span style={{ color: 'white', fontSize: '17px' }}>Your tax is: </span> 
      <span style={{ color: 'white', fontSize: '17px' }}>${tax.toFixed(2)}</span>
    </p>
  )}
</div>


</div>
);
}

export default TaxCalculator;
