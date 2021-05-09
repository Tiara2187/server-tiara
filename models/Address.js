const mongoose = require('mongoose');
const Schema = mongoose.Schema

const addressSchema = new Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    village : {type : String},
    district: {type : String},
    city : {type : String},
    province : {type: String},
    country : {type : String},
    zip : {type : Number},   
},
{
    timestamps: true
})

module.exports = mongoose.model('Address',addressSchema)
