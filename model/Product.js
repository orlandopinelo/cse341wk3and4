const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const productSchema = new Schema({
    productName : {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
    },
    price : {
        type: Number,
        required: [true, 'Price is required.']
        
    },
    description : {
        type:String,
        required: [true, 'Provide a detail description of product, color , size , type.'],
        trim : true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required.']
    },
    purchaseDate: {
        type: Date,
        required: [true, 'Date is required in this format yyyy/mmm/ddd.']
    },
    discount: {
        type: Number,
        required: [true, 'Discount is required'],
        
    },
    providerId: {
        type: Number,
        required: [true, 'Provider Id is required.'],
        min:[1000],
    }

 });
 module.exports = mongoose.model('Product', productSchema);