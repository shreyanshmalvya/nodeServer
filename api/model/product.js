const mongoose = require('mongoose');

//descriptive to avoid wrong data type
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type : String, required: true},
    price: { type: Number, required: true}
});


//exporting our product schema wrapped in mongoose model 
module.exports = mongoose.model('Product', productSchema)