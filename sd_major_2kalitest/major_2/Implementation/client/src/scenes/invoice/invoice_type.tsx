import React, { useState } from 'react';
 // Import CSS file for styling
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

  const handleAddProduct = () => {
    setProducts([...products, { particular: '', qty: 0, rate: 0, amt: 0 }]);
  };

  const handleDeleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value as any;
    updatedProducts[index].amt = updatedProducts[index].qty * updatedProducts[index].rate;
    setProducts(updatedProducts);
  };

  const getTotal = (): number | string => {
    // Check if any product's quantity or rate is not a number
    const hasInvalidInput = products.some(product => isNaN(product.qty) || isNaN(product.rate));
  
    if (hasInvalidInput) {
      return '...'; // If any input is invalid, return '...'
    }

  
    // Calculate the total if all inputs are valid
    const total = products.reduce((acc, product) => acc + product.qty * product.rate, 0);
    return total;
  };
  
  

  const handleReset = () => {
    setCustomer({ name: '', address: '', city: '' });
    setInvoiceDetails({ number: '', date: '' });
    setProducts([{ particular: '', qty: 0, rate: 0, amt: 0 }]);
  };
  
  // Inside your component's JSX
  
  

  const handlePrint = () => {
    window.print();
  };

  return (
    
    <div className="container">
        
  <div className="card">
    <div className="card-header text-center">
     
    </div>
    <div className="card-body">
      <div className="customer-info">
        {/* Customer details */}
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
      <div className="col">
        {/* Invoice details */}
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
            <th>Item name</th> {/* this is particular */}
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
  <button type="button" className="btn btn-warning" onClick={handleReset}>Reset</button>
  <button type="button" className="btn btn-primary" onClick={handlePrint}>Print</button>
</div>

</div>

    </div>
  </div>
</div>

  );
};

export default Invoice;
