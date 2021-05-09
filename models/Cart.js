const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity : {
        type: Number,
        default: 0
    },
    totalprice : {
        type : Number
    },

},
    {
        timestamps: true
    })

    module.exports = mongoose.model('Cart',cartSchema)