const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  console.log(result);
  res.send(result.toString());
});
//membership check
function checkMembership(isMember, cartTotal) {
  if (isMember === 'true') {
    let discountPrice = cartTotal - cartTotal * (discountPercentage / 100);
    return discountPrice;
  } else return cartTotal;
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(checkMembership(isMember, cartTotal).toString());
});
// calculate tax
function calculateTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal).toString());
});
//estimate Delivery
function estimateDelivery(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  } else return distance / 50;
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(estimateDelivery(shippingMethod, distance).toString());
});

//calculate shipping cost
function getShipCost(weight, distance) {
  return distance * weight * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(getShipCost(weight, distance).toString());
});
//calculate loyalty points
function calLoyaltypts(purchaseAmount) {
  return purchaseAmount * 2;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calLoyaltypts(purchaseAmount).toString());
});
