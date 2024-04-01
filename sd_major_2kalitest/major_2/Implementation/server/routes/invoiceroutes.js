import express from "express";
import Invoice from "../models/Invoice.js"; // Import your Invoice model

const router = express.Router();

// POST route to create a new invoice
router.post("/", async (req, res) => {
  try {
    // Extract data from request body
    const { customer, invoiceDetails, products } = req.body;

    console.log("Received request to create invoice:", req.body);

    // Create a new invoice document
    const newInvoice = new Invoice({
      customer,
      invoiceDetails,
      products
    });

    console.log("Creating new invoice:", newInvoice);

    // Save the new invoice to the database
    await newInvoice.save();

    console.log("Invoice saved successfully.");

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

