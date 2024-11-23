const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const customerSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type:String,
        required: true
    },
    itin: {
        type: Number,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }

 });
 module.exports = mongoose.model('Customer', customerSchema);