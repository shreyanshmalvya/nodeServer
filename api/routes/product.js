//first we set up a router with Express
const express = require('express');
const router = express.Router();

// now we take a look at schema to find out routes at this endpoint
// we use router in express in order to set up routes

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /Products'
    });
});


router.post('/', (req, res, next) => {
    //extracting data from body and using it
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Product Created',
        product: product
    });
});

//for indivisual products 

router.get('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'indivisual product fetched',
        id: req.params.productId
    });

});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product updated!'
    })

});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    })

});

module.exports = router;