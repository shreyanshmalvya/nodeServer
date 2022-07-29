//first we set up a router with Express
const express = require('express');
const { default: mongoose } = require('mongoose');
const product = require('../model/product');
const router = express.Router();
const Product = require('../model/product')


// now we take a look at schema to find out routes at this endpoint
// we use router in express in order to set up routes

router.get('/', (req, res, next) => {
    Product.find().select('name price _id')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.post('/', (req, res, next) => {
    //extracting data from body and using it
    const product = new Product({
        //pass objectID as a function () to autogenerate the id
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    //after creation we save the data
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product Created',
            product: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//for indivisual products 

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
        .then(doc => {
            console.log(doc);

            //check if not returning a null message for incorrect id
            if (doc > 0) {
                res.status(200).json({
                    message: 'indivisual product fetched',
                    details: doc
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found aginst the given id'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.id;
    //update using $set and updateOperation array
    const updateOps = {};
    //iterate in update array with each value having its value
    for (const ops in updateOps) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then( result=>{
        res.status(200).json({
            message: 'Product updated!',
            product: result
        });
    }).catch( err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Deleted',
                details: result
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;