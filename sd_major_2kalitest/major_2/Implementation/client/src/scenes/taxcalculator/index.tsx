import React, { useState } from 'react';
import './tax.css'; // Import CSS file for styling
import { useToast, Button, Input, InputLeftElement, InputGroup, Grid, GridItem } from '@chakra-ui/react';
import TaxCalculator from './TaxCalculator'; // Import the Tax Calculator component

function MainComponent() {
  // Your existing code...

  return (
    <div className="tax-calculator-container">
        <h2 className="tax-calculator-title">TAX CALCULATOR</h2>
      
      {/* Integrate the Grid component */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* Include the TaxCalculator component here */}
        <GridItem colSpan={4}>
          <TaxCalculator />
        </GridItem>
      </Grid>

      {/* Your existing JSX code */}
    </div>
  );
}

export default MainComponent;
