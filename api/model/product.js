const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});


//exporting our product schema wrapped in mongoose model 
module.exports = mongoose.model('Product', productSchema)