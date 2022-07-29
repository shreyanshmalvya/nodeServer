const express = require ('express');
const router = express.Router();

// for normal orders

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order fetched'
    });

});

router.post('/', (req, res, next) => {
    //extracting data from body and using it
    const order  = {
        productID : req.body.productID,
        quantity: req.body.quantity
    }
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