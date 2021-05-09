const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkoutSchema = new Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    totalprice: {type: Number},
    historyorder: {type: String}
},

{
    timestamps: true
})

module.exports = mongoose.model('Checkout',checkoutSchema)