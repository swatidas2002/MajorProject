
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  invoiceDetails: {
    number: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  products: [{
    particular: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    amt: { type: Number, required: true },
  }],
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
