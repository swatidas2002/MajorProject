import React, { useState } from 'react';
import axios from 'axios';

import './invoice.css';

interface Product {
  particular: string;
  qty: number;
  rate: number;
  amt: number;
}

const Invoice: React.FC = () => {
  const [customer, setCustomer] = useState({ name: '', address: '', city: '' });
  const [invoiceDetails, setInvoiceDetails] = useState({ number: '', date: '' });
  const [products, setProducts] = useState<Product[]>([{ particular: '', qty: 0, rate: 0, amt: 0 }]);
  const [invoicesLog, setInvoicesLog] = useState<string[]>([]);
  const [showInvoicesLog, setShowInvoicesLog] = useState(false); // State to control visibility of invoices log

  const handleAddProduct = () => {
    setProducts([...products, { particular: '', qty: 0, rate: 0, amt: 0 }]);
  };

  const handleDeleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value as never; // Type assertion
    updatedProducts[index].amt = updatedProducts[index].qty * updatedProducts[index].rate;
    setProducts(updatedProducts);
  };
  

  const getTotal = (): number | string => {
    const hasInvalidInput = products.some(product => isNaN(product.qty) || isNaN(product.rate));
  
    if (hasInvalidInput) {
      return '...';
    }

    const total = products.reduce((acc, product) => acc + product.qty * product.rate, 0);
    return total;
  };

  const handleReset = () => {
    setCustomer({ name: '', address: '', city: '' });
    setInvoiceDetails({ number: '', date: '' });
    setProducts([{ particular: '', qty: 0, rate: 0, amt: 0 }]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async () => {
    try {
      const invoiceData = {
        customer,
        invoiceDetails,
        products
      };
  
      // Send POST request to server to create new invoice
      const response = await axios.post('http://localhost:1337/invoice', invoiceData); // Change the URL to match your server's address
        
      // Optionally, handle success response here
      console.log('Invoice created:', response.data);
  
      // Update invoices log state
      //setInvoicesLog([...invoicesLog, JSON.stringify(invoiceData)]);
      
      // Clear form fields or perform any other actions after successful submission
      handleReset();
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.data) {
        console.error('Error creating invoice:', error.response.data);
      } else {
        console.error('Error creating invoice:', error);
      }
      // Optionally, display error message to user
    }
  };
  
  

  /*const toggleInvoicesLog = () => {
    setShowInvoicesLog(!showInvoicesLog); // Toggle visibility of invoices log
  };*/

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center"></div>
            <div className="card-body">
              {/* Customer details */}
              <div className="customer-info">
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">Customer Name</label>
                  <input type="text" className="form-control" id="customerName" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerAddress" className="form-label">Address</label>
                  <input type="text" className="form-control" id="customerAddress" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerCity" className="form-label">State and City</label>
                  <input type="text" className="form-control" id="customerCity" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
                </div>
              </div>
              {/* Invoice details */}
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                  <input type="text" className="form-control" id="invoiceNumber" value={invoiceDetails.number} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, number: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                  <input type="date" className="form-control" id="invoiceDate" value={invoiceDetails.date} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })} />
                </div>
              </div>
            
              {/* Product details */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Item name</th>
                    <th className="text-end">Qty</th>
                    <th className="text-end">Rate</th>
                    <th className="text-end">Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td><input type="text" className="form-control" value={product.particular} onChange={(e) => handleInputChange(index, 'particular', e.target.value)} /></td>
                      <td><input type="number" className="form-control text-end" value={product.qty} onChange={(e) => handleInputChange(index, 'qty', parseInt(e.target.value))} /></td>
                      <td><input type="number" className="form-control text-end" value={product.rate} onChange={(e) => handleInputChange(index, 'rate', parseInt(e.target.value))} /></td>
                      <td><input type="number" className="form-control text-end" value={product.amt} disabled /></td>
                      <td><button type="button" className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(index)}>X</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-center">
                <button type="button" className="btn btn-success" onClick={handleAddProduct}>Add Product</button>
              </div>
              <div className="text-center">
                <label id="totalLabel">Total: ${getTotal()}</label>
              </div>
              <div className="text-center">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button type="button" className="btn btn-submit" onClick={handleSubmit}>Submit</button>
                  <button type="button" className="btn btn-warning" onClick={handleReset}>Reset</button>
                  <button type="button" className="btn btn-primary" onClick={handlePrint}>Print</button>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Invoice;
