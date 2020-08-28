"use strict";
const express = require("express");
const routes = express.Router();

const cart = [
  {
    id: 1,
    product: "Widget",
    price: 1,
    quantity: 100,
  },
  {
    id: 2,
    product: "Whatsit",
    price: 3.33,
    quantity: 1,
  },
  {
    id: 3,
    product: "Thinimajig",
    price: 11,
    quantity: 33,
  },
  {
    id: 4,
    product: "Whoozimiwutzes",
    price: 999,
    quantity: 10,
  },
];

let nextId = 5;

// name in the quotes on line 36 does not have to reference the name of the array. It is basically a variable that references the information in the url.

routes.get("/cart", (req, res) => {
  const maxPrice = Number(req.query.maxPrice);
  const prefix = req.query.prefix;
  const pageSize = Number(req.query.pageSize);
  if (maxPrice) {
    const filteredCart = cart.filter((item) => item.price <= maxPrice);
    res.status(200);
    res.json(filteredCart);
  } else if (prefix) {
    const filteredCart = cart.filter((item) =>
      item.product.toLowerCase().includes(prefix.toLowerCase(), 0)
    );
    res.status(200);
    res.json(filteredCart);
  } else if (pageSize) {
    const filteredCart = cart.slice(0, pageSize);
    res.status(200);
    res.json(filteredCart);
  } else {
    res.json(cart);
  }
});

routes.get("/cart/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = cart.find((item) => item.id === id);
  if (item) {
    res.status(200);
    res.json(item);
  } else {
    res.status(404);
    res.send(`product ID ${id} is not in the database`);
  }
});

routes.post("/cart", (req, res) => {
  const item = req.body;
  cart.id = nextId++;
  cart.push(item);
  res.status(201);
  res.json(cart);
});

routes.put("/cart/:id", (req, res) => {
  const item = req.body;
  const id = Number(req.params.id);
  const index = cart.findeIndex((item) => item.id === id);
  if (index !== -1) {
    cart[index] = item;
    item.id = id;
    res.status(200);
    res.json(cart);
  } else {
    res.status(404);
    res.send(`item ${id} is not in our database and can not be edited`);
  }
});

routes.delete("/cart/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    res.status(200);
    cart.splice(index, 1);
  }
  res.status(204);
  res.send();
});

module.exports = routes;
