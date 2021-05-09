const mongoose = require('mongoose');
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    productname : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    productprice:{
        type: Number,
        required: true

    },
    productimage: {
        type: String,
        required: true
    },
    _categoryId:{
        type : Schema.Types.ObjectId, ref: 'Category',
        required: true

    },
    description: {
        type: String,
        required: true
    },
    preview : {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 100
    },  
},
{
    timestamps: true
})

module.exports = mongoose.model('Product',productSchema)