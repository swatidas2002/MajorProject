import React, { useState } from 'react';
import './tax.css'; // Import CSS file for styling
import { Button } from '@chakra-ui/react';

function TaxCalculator() {
  const [income, setIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [miscellaneousExpenses, setMiscellaneousExpenses] = useState<number>(0);
  const [estimatedTaxPayments, setEstimatedTaxPayments] = useState<number>(0);
  const [entityType, setEntityType] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('');
  const [tax, setTax] = useState<number>(0);
  const [showPopups, setShowPopups] = useState<boolean[]>([false, false, false, false, false]); // Array of boolean values for showing popups

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setIncome(value);
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
    const popupsToShow: boolean[] = [false, false, false, false, false];
    if (!entityType || !filingStatus) {
      popupsToShow[0] = true;
    }
    if (isNaN(income) || income === 0) {
      popupsToShow[1] = true;
    }
    if (isNaN(totalExpenses) || totalExpenses === 0) {
      popupsToShow[2] = true;
    }
    if (isNaN(miscellaneousExpenses) || miscellaneousExpenses === 0) {
      popupsToShow[3] = true;
    }
    if (isNaN(estimatedTaxPayments) || estimatedTaxPayments === 0) {
      popupsToShow[4] = true;
    }
    setShowPopups(popupsToShow);
  
    if (popupsToShow.every((popup) => !popup)) {
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
    }
  };
  

  const calculateCCorporationTax = (income: number) => {
    return income * 0.21; // Assume a flat corporate tax rate of 21%
  };

  const calculateSCorporationTax = (income: number, filingStatus: string) => {
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

  const handleReset = () => {
    setIncome(0);
    setTotalExpenses(0);
    setMiscellaneousExpenses(0);
    setEstimatedTaxPayments(0);
    setEntityType('');
    setFilingStatus('');
    setTax(0);
    setShowPopups([false, false, false, false, false]);
  };

  return (
    <div className="tax-calculator-container">
      <div>
        <label htmlFor="entityType">Select entity type:</label>
        <select id="entityType" value={entityType} onChange={handleEntityTypeChange}>
          <option value="">Select your Entity Type</option>
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
          <option value="">Select your Filing Status</option>
          <option value="Single">Single</option>
          <option value="Married, Filing Jointly">Married, Filing Jointly</option>
          <option value="Married, Filing Separately">Married, Filing Separately</option>
          <option value="Head of Household">Head of Household</option>
          <option value="Qualifying Widow(er)">Qualifying Widow(er)</option>
        </select>
      </div>
      <div>
        <label htmlFor="income">Enter your income (in $):</label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={handleIncomeChange}
        />
      </div>
      <div>
        <label htmlFor="totalExpenses">Total expenses (in $):</label>
        <input
          type="number"
          id="totalExpenses"
          value={totalExpenses}
          onChange={handleTotalExpensesChange}
        />
      </div>
      <div>
        <label htmlFor="miscellaneousExpenses">Miscellaneous expenses (in $):</label>
        <input
          type="number"
          id="miscellaneousExpenses"
          value={miscellaneousExpenses}
          onChange={handleMiscellaneousExpensesChange}
        />
      </div>
      <div>
        <label htmlFor="estimatedTaxPayments">Estimated tax payments (in $):</label>
        <input
          type="number"
          id="estimatedTaxPayments"
          value={estimatedTaxPayments}
          onChange={handleEstimatedTaxPaymentsChange}
        />
      </div>

      <div className="button-container">
        <Button onClick={calculateTax} className="calculate-tax-button">Calculate Tax</Button>
        <Button onClick={handleReset} className="reset-button">Reset</Button>
      </div>

      <div className="popup-container">
        {showPopups.map((showPopup, index) => {
          if (showPopup) {
            return (
              <div key={index} className="popup">
                <div className="popup-content">
                  {index === 0 && <p className="popup-text">Please select both entity type and filing status.</p>}
                  {index === 1 && <p className="popup-text">Please input your income.</p>}
                  {index === 2 && <p className="popup-text">Please input your total expenses.</p>}
                  {index === 3 && <p className="popup-text">Please input your miscellaneous expenses.</p>}
                  {index === 4 && <p className="popup-text">Please input your estimated payments.</p>}
                  <button className="close-popup-button" onClick={() => setShowPopups(prevState => prevState.map((value, i) => i === index ? false : value))}>X</button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Display tax amount if calculated */}
      <div className="tax-result">
        {tax > 0 && (
          <p className="tax-result-text">Your tax is: <span className="tax-amount">${tax.toFixed(2)}</span></p>
        )}
      </div>
    </div>
  );
}

export default TaxCalculator;
