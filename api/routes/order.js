const express = require ('express');
const router = express.Router();

// for normal orders

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order fetched'
    });

});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order created'
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