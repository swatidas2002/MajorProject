import React from 'react';
// Import CSS file for styling
import { Grid, GridItem } from '@chakra-ui/react';
import Invoice from './invoice_type'; // Import the Invoice component
import './invoice.css';

function InvoiceSystem() {
  return (
    
    <div className="invoice-container">
      
      <h2 className="invoice-title"><center>INVOICE SYSTEM</center></h2>
      {/* Integrate the Grid component */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {/* Include the Invoice component here */}
        <GridItem colSpan={4}>
          <Invoice />
        </GridItem>
      </Grid>
    </div>
    
  );
}

export default InvoiceSystem;
