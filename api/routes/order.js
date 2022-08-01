const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../model/order');
const Product = require('../model/product');

// for normal orders
router.get('/', (req, res, next) => {
    Order.find().select('product quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(order => {
                    return {
                        id: order._id,
                        productId: order.product,
                        quantity: order.quantity,
                        request: {
                            type: 'GET',
                            url: 'localhost:5000/Orders/' + order._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    //first we check if the incomming product exists or not
    Product.findById(req.body.product)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            //then we create order corresponding to it
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product : req.body.product
            });
            //use return to use then to create a promise later
            return order.save()
        })
        .then(result => {
            res.status(201).json({
                message: 'Order Created Successfully',
                orderDetails: {
                    id : result._id,
                    productID : result.product,
                    quantity : result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'localhost:5000/Orders/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


// for indivisual orders

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).select('product quantity _id')
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order Fetched',
                order: result,
                request: {
                    type: "GET",
                    url: 'localhost:5000/Orders/'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id : id}).exec()
    .then(result => {
        res.status(200).json({
            message : "Order deleted",
            details : result,
            request  : {
                type : 'POST',
                url : 'localhost:5000/Orders/' ,
                body : {
                    product : 'ID',
                    quantity : "Number"
                }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;