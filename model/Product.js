const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const productSchema = new Schema({
    productName : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description : {
        type:String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    providerId: {
        type: Number,
        required: true
    }

 });
 module.exports = mongoose.model('Product', productSchema);