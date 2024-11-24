const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 const customerSchema = new Schema({
    firstName : {
        type: String,
        required: [true, 'Frist Name is Required'],
        minlength: [3, 'First Name should be atleast 3 characters'],
        trim: true
    },
    lastName : {
        type: String,
        required: [true, 'Last Name is required'],
        minlength: [3, 'Last Name should be at least 3 characters'],
        trim: true,
    },
    email : {
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
    },
    itin: {
        type: Number,
        required: [true, 'Individual Tax Number cannot be empty.'],
        validate: {
            validator: Number.isInteger,
            message: 'ITIN must be a number and not a letter.',
          },
        min: [1000,'Individual Tax Number  is 4 digits long.'],
    },
    businessName: {
        type: String,
        required: [true, 'Address is required'],
        minlength:[10, 'Business Name must me at least 10 character long.'],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be a 10-digit number'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,    
    }

 });

 module.exports = mongoose.model('Customer', customerSchema);