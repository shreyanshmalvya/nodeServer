const express = require ('express');
const router = express.Router();
const mongoose  = require('mongoose');
const Order = require('../model/order');

// for normal orders

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order fetched'
    });

});

router.post('/', (req, res, next) => {
    //extracting data from body and using it
    const itemList = req.body.prodcuts;
    const order = new Order({
        _id : new mongoose.Types.ObjectId,
        toalProducts : itemList.length,
        prodcuts : itemList.map(item =>{
            return {
                name : item.name,
                price : item.price
            }
        }),
        totalPrice: req.body.totalPrice
    })

    
    res.status(201).json({
        message: 'Order created',
        order: order
    });

});


// for indivisual orders

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order fetched',
        id: req.params.orderId
    });

});


router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted'
    });

});

module.exports = router;