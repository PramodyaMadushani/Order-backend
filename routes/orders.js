const express = require("express");
const router = express.Router();
const Orders = require("../models/order");

// Create an order
router.post("/", (req, res) => {
    Orders.create(req.body)
        .then(order => res.status(201).json({ msg: "Order added successfully", order }))
        .catch(err => {
            console.error(err);
            res.status(400).json({ msg: "Order adding failed", error: err.message });
        });
});

// Get all orders
router.get("/", (req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: "No orders found", error: err.message });
        });
});

// Other routes (GET, PUT, DELETE) can go here...

module.exports = router;
