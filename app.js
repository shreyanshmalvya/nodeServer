const express = require('express');
const app = express();

//import product routes

const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order')

//middleware

// app.use('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Welcome to the Server'
//     });
// });

// we use routes to directly route our data 
// for products 

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);


module.exports = app;